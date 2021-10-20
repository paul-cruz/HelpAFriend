import { PersistentSet, PersistentUnorderedMap } from "near-sdk-as";

@nearBindgen
export class Person {
    accountId: string;
    friends: PersistentSet<string>;
    projects: PersistentSet<string>;

    constructor(
        accountId: string) {
        this.accountId = accountId;
        this.friends = new PersistentSet<string>(accountId + "_friends");
        this.projects = new PersistentSet<string>(accountId + "_projects");
    }

    addFriend(accountId: string): void {
        this.friends.add(accountId);
    }

    getProjects(): Array<string> {
        return this.projects.values();
    }
}

@nearBindgen
export class Project {
    name: string;
    ownerId: string;
    description: string;
    goal: u64;
    got: u64;
    isPublic: bool;

    constructor(
        name: string,
        ownerId: string,
        description: string,
        goal: u64,
        isPublic: bool) {
        this.name = name;
        this.ownerId = ownerId;
        this.description = description;
        this.goal = goal;
        this.isPublic = isPublic;
    }

    donate(amount: u64): void {
        assert(amount < this.goal, "Goal reached");
        this.got += amount;
    }

    get(): string {
        return this.name + " : " + this.description + ". Reached: " + this.got.toString();
    }
}

export let publicProjects = new PersistentUnorderedMap<string, Project>("publicProjects");
export let privateProjects = new PersistentUnorderedMap<string, Project>("privateProjects");
export let people = new PersistentUnorderedMap<string, Person>("peopleInNet");
