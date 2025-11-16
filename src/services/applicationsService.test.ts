import { describe, expect, test } from "vitest";
import { server } from '../mocks/node';
import { ApplicationService } from "./applicationsService";
import { http, HttpResponse } from "msw";

describe('service: applications service', (): void => {
    beforeAll((): void => {
        server.listen();
    });

    afterEach((): void => {
        server.resetHandlers();
    });

    afterAll((): void => {
        server.close();
    });

    it('fetches a page of applications', async (): Promise<void> => {
        const page1 = [
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
        ];
        const page2 = [
            {
                guid: "298f8667-2225-41f6-a866-d650d52e99fd",
                loan_amount: 12345,
                first_name: "Miles",
                last_name: "Espinoza",
                company: "Qnekt",
                email: "milesespinoza@qnekt.com",
                date_created: "2021-08-10",
                expiry_date: "2021-12-02",
            },
            {
                guid: "2edbee82-a7b1-4dd7-b60f-df9ed669dd53",
                loan_amount: 54321,
                first_name: "Joe",
                last_name: "Bloggs",
                company: "Example.com",
                email: "joe.bloggs@example.com",
                date_created: "2025-03-06",
                expiry_date: "2025-12-31",
            },
        ];
        http.get('http://localhost:3001/api/applications', ({ request }) => {
            const url = new URL(request.url);
            const page = url.searchParams.get('_page');
            const headers = [
                ['expires', '-1'],
                ['pragma', 'no-cache'],
                ['x-total-count', '100'],
            ] as [string, string][];
            if (page === '1') {
                return HttpResponse.json(page1, {
                    headers: [
                        ...headers,
                        ['link', '<http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first", <http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next", <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"'],
                    ],
                });
            }
            return HttpResponse.json(page2, {
                headers: [
                    ...headers,
                    ['link', '<http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first", <http://localhost:3001/api/applications?_page=1&_limit=5>; rel="prev", <http://localhost:3001/api/applications?_page=3&_limit=5>; rel="next", <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"'],
                ],
            });
        });
        const service = ApplicationService.getInstance();
        const page1Response = await service.getPage(1);
        expect(page1Response).toHaveLength(5);
        expect(page1Response).toEqual(page1);
        const page2Response = await service.getPage(2);
        expect(page2Response).toHaveLength(2);
        expect(page2Response).toEqual(page2);
    });
});
