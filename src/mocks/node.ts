import { HttpHandler } from "msw";
import { setupServer } from 'msw/node';
import { handlers } from "./applications.handlers";

export const server = setupServer(...handlers);
