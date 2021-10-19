import { logging } from "near-sdk-as";
import { Context } from "near-sdk-core"
import { people, Person, Project, publicProjects } from "./model"

@nearBindgen
export class Contract {

  register(): bool {
    const exists = people.get(Context.sender);
    if (exists) {
      logging.log("User already in network");
      return false;
    }
    people.set(Context.sender, new Person(Context.sender));
    return true;
  }

  createProject(name: string, description: string, goal: u64, isPublic: bool): bool {
    const user = people.get(Context.sender);

    if (!user) {
      logging.log("User not registered in the network");
      return false;
    }

    var newProject = new Project(name, Context.sender, description, goal, isPublic);
    if (isPublic) {
      publicProjects.set(name, newProject);
      logging.log("public created");
    }
    //user.projects.set(name, newProject);
    return true;
  }

  getPublicProjects(): string {
    let projects: Array<string> = publicProjects.keys();
    return projects.join(",");
  }

  getPublicProject(id: string): string {
    let project: Project | null = publicProjects.get(id);
    if (project == null) {
      return "No project found";
    }
    return project.get();
  }

  addFriend(friendId: string): bool {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return false;
    }

    const friend = people.get(friendId);
    if (!friend) {
      logging.log("Friend doesn't exist in the network");
      return false;
    }
    user.addFriend(friendId);
    return true;
  }


  getFriendProjects(friendId: string): string | null {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return null;
    }

    if (!user.friends.has(friendId)) {
      logging.log("Friend doesn't exist");
      return null;
    }
    const friend = people.getSome(friendId);

    let projects = friend.getProjects();
    return projects.join(",");
  }

  donatePublicProject(name: string, amount: u64): bool {
    const project = publicProjects.get(name);
    if (!project) {
      logging.log("Project doesn't exist");
      return false;
    }

    project.donate(amount);
    if (project.isPublic) {
      publicProjects.set(name, project);
    }
    return true;
  }

  donateFriendProject(name: string, amount: u64): bool {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return false;
    }

    const project = user.projects.get(name);
    if (!project) {
      logging.log("Project doesn't exist");
      return false;
    }

    project.donate(amount);
    return true;
  }

  viewPeople(): string {
    let p = people.keys();
    return p.join(",");
  }

}