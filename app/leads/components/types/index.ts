export type Status = "new" | "offer" | "negotiations" | "reserved" | "contract";

export type Task = {
  name: any;
  user: any;
  id: string;
  phone: number;
  title: string;
  description: string;
  stage: Status;
  updatedAt: Date;
};

export type BoardSections = {
  [name: string]: Task[];
};

