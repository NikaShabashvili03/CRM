import axios from 'axios';
import { Task, Status } from '../types';

export const getTasksByStatus = (tasks: Task[], status: Status) => {
  return tasks.filter((task) => task.stage === status);
};

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id);
};
