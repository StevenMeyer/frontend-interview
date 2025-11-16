import { http, HttpResponse, HttpResponseResolver } from 'msw';
import { Application } from '../models/Application';

export function makeGetApplicationsResolver(json: readonly Application[], headers?: [string, string][]): HttpResponseResolver {
    return () => {
        return HttpResponse.json(json, {
            headers: [
                ['expires', '-1'],
                ['link', '<http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first", <http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next", <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"'],
                ['pragma', 'no-cache'],
                ['x-total-count', '100'],
                ...(headers ?? []),
            ],
        });
    };
}

export const handlers = [
    http.get('http://localhost:3001/api/applications', makeGetApplicationsResolver([
        {
            guid: "8a8f6cbc-77a1-4086-8968-a57816f4ff60",
            loan_amount: 37597,
            first_name: "Miles",
            last_name: "Espinoza",
            company: "Qnekt",
            email: "milesespinoza@qnekt.com",
            date_created: "2021-08-10",
            expiry_date: "2021-12-02",
        },
        {
            guid: "74d68fab-9f2f-48ff-9a1a-01194bd051ea",
            loan_amount: 31728,
            first_name: "Joe",
            last_name: "Bloggs",
            company: "Example.com",
            email: "joe.bloggs@example.com",
            date_created: "2025-03-06",
            expiry_date: "2025-12-31",
        },
        {
            guid: "f69bb933-371c-40ad-bf05-c176610265a7",
            loan_amount: 12500,
            first_name: "Joe",
            last_name: "Bloggs",
            company: "Example.com",
            email: "joe.bloggs@example.com",
            date_created: "2025-04-01",
            expiry_date: "2025-12-31",
        },
        {
            guid: "a80e813d-368e-416d-aa84-d1fbbae47e68",
            loan_amount: 28000,
            first_name: "Jane",
            last_name: "Dear",
            company: "Example.org",
            email: "jd@example.org",
            date_created: "2024-01-29",
            expiry_date: "2024-06-01",
        },
        {
            guid: "5f006efe-aec8-4e5f-a7b2-a06fbe3fb8bb",
            loan_amount: 999,
            first_name: "Miles",
            last_name: "Espinoza",
            company: "Qnekt",
            email: "milesespinoza@qnekt.com",
            date_created: "2022-01-10",
            expiry_date: "2022-12-10",
        },
    ])),
];
