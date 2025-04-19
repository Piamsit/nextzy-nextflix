import { expect, test } from '@playwright/test';

test.describe("API Endpoint Tests", () => {
    test("GET /api/links", async ({ request }) => {
        const response = await request.get("/api/links");
        expect(response.ok).toBeTruthy();
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
    });
})