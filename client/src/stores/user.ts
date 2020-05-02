/** @format */

import { observable, action } from "mobx";
import axios, { AxiosResponse } from "axios";
import removeMd from "remove-markdown";

export type UserDataResponse = {
  data: UserData;
};

export type UserData = {
  access_token: string;
  user_name: string;
  avatar_url: string;
  email: string;
};

type EventResponse = {
  data: Event[];
};

export type Event = {
  type: string;
  payload: Payload;
  repo: Repo;
  actor: Actor;
  created_at: string;
  id: string;
};

export type Repo = {
  name: string;
  url: string;
};

export type Actor = {
  login: string;
  avatar_url: string;
};

export type Payload = {
  before?: string;
  head?: string;
  ref?: string;
  size?: number;
  action?: string;
  ref_type?: string;
  pull_request?: PullRequest;
  issue?: Issue;
  commits?: Commit[];
  forkee?: Forkee;
};

export type Issue = {
  number: number;
  title: string;
  labels: Label[];
  body: string;
};

export type Label = {
  color: string;
  name: string;
};

export type PullRequest = {
  number: number;
  labels: Label[];
  title: string;
  body: string;
  additions: string;
  deletions: string;
};

export type Commit = {
  author: Author;
  message: string;
  sha: string;
};

export type Author = {
  email: string;
  name: string;
};

export type Forkee = {
  full_name: string;
};

type LoadedEvent = {
  id: string;
  createdAt: string;
  avatarUrl: string;
  username: string;
  type: string;
  repoName: string;
  repoUrl?: string;
  toRepo?: string;
  issue?: Issue;
  pullRequest?: PullRequest;
  commits?: CommitContainer;
};

type CommitContainer = {
  before: string;
  head: string;
  size: string;
  ref: string;
  commits: Commit[];
};

export default class UserStore {
  private currentIdx: number;

  @observable userInfo = {
    userName: "",
    email: "",
    avatarUrl: "",
    accessToken: "",
  };

  @observable loadedEvents: Event[] = [];
  @observable loading: boolean = false;
  @observable currentPage: number = 0;
  @observable lastPage: number = -1;

  constructor() {
    this.currentIdx = 0;
  }

  @action login = async (data: UserData) => {
    this.userInfo = {
      userName: data.user_name,
      email: data.email,
      avatarUrl: data.avatar_url,
      accessToken: data.access_token,
    };
    this.loadedEvents = [];
    this.currentPage = 0;
    this.lastPage = -1;
    this.currentIdx = 0;

    await this.loadNextPage();
  };

  @action logout = async () => {
    this.userInfo = {
      userName: "",
      email: "",
      avatarUrl: "",
      accessToken: "",
    };
    this.loading = false;
    this.loadedEvents = [];
    this.currentPage = 0;
    this.lastPage = -1;
    this.currentIdx = 0;
  };

  @action loadNextPage = async () => {
    try {
      this.loading = true;
      await this.getEvents();
      this.loading = false;
    } catch (error) {}
  };

  parsingEvent = (event: Event) => {
    const { type, actor, payload, created_at, id, repo } = event;
    const last = this.loadedEvents[this.loadedEvents.length - 1];
    if (last !== undefined && last.id.split("/")[0] <= id) return;

    let eventDict: Event = {
      id,
      created_at: created_at,
      actor: {
        login: actor.login,
        avatar_url: actor.avatar_url,
      },
      type,
      repo: {
        name: repo.name,
        url: repo.url,
      },
      payload: {},
    };

    if (
      (type === "WatchEvent" && payload.action === "started") ||
      (type === "CreateEvent" && payload.ref_type === "repository") ||
      type === "PublicEvent"
    ) {
      //repository 처리
      this.loadedEvents.push(eventDict);
    } else if (type === "ForkEvent") {
      eventDict.payload = {
        forkee: {
          full_name: payload.forkee ? payload.forkee.full_name : "untitled",
        },
      };
      this.loadedEvents.push(eventDict);
    } else if (
      (type === "IssuesEvent" || type === "PullRequestEvent") &&
      payload.action === "opened"
    ) {
      const labels: Label[] =
        type === "IssuesEvent"
          ? payload.issue
            ? payload.issue.labels
            : []
          : payload.pull_request
          ? payload.pull_request.labels
          : [];

      const filteredLabels: Label[] = [];

      labels.forEach((label) => {
        if (label.name === "help wanted" || label.name === "good first issue") {
          filteredLabels.push({
            color: label.color,
            name: label.name,
          });
        }
      });

      if (payload.issue) {
        eventDict.payload.issue = {
          body: removeMd(payload.issue.body),
          labels: filteredLabels,
          number: payload.issue.number,
          title: payload.issue.title,
        };
      } else if (payload.pull_request) {
        eventDict.payload.pull_request = {
          body: removeMd(payload.pull_request.body),
          labels: filteredLabels,
          number: payload.pull_request.number,
          title: payload.pull_request.title,
          additions: payload.pull_request.additions,
          deletions: payload.pull_request.deletions,
        };
      }
      this.loadedEvents.push(eventDict);
    } else if (type === "PushEvent" && payload.head !== payload.before) {
      const commits: Commit[] = payload.commits
        ? payload.commits.map((commit) => {
            return {
              author: commit.author,
              message: removeMd(commit.message).split("\n")[0],
              sha: commit.sha,
            };
          })
        : [];

      eventDict.payload = {
        before: payload.before,
        head: payload.head,
        size: payload.size,
        ref: payload.ref,
        commits,
      };
      this.loadedEvents.push(eventDict);
    }
  };

  getEvents = async () => {
    let res: AxiosResponse<Event[]>, data: Event[], links: string[];
    let startLength: number = this.loadedEvents.length;
    while (this.lastPage < 0 || this.currentPage < this.lastPage) {
      if (this.userInfo.accessToken)
        res = await axios.get(
          `https://api.github.com/users/${this.userInfo.userName}/received_events`,
          {
            headers: {
              Authorization: `token ${this.userInfo.accessToken}`,
            },
            params: {
              page: this.currentPage + 1,
            },
          }
        );
      else
        res = await axios.get(`https://api.github.com/events`, {
          params: {
            page: this.currentPage + 1,
          },
        });
      data = res.data;
      links = res.headers.link.split(",");

      if (this.lastPage < 0) {
        links.forEach((link: string) => {
          const rel = link.split("rel=")[1];
          const page = link.split("?page=")[1][0];
          if (rel === '"last"') this.lastPage = parseInt(page);
        });
      }

      for (let i = this.currentIdx; i < data.length; i++) {
        this.parsingEvent(data[i]);
        this.currentIdx = (this.currentIdx + 1) % 30;
        if (
          this.loadedEvents.length > startLength &&
          this.loadedEvents.length % 30 === 0
        ) {
          return;
        }
      }
      this.currentPage++;
    }
  };
}
