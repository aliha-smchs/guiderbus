import { expect, test } from "@playwright/test";

test.describe("public routes", () => {
  for (const path of [
    "/",
    "/services",
    "/contact",
    "/platform",
    "/privacy",
    "/terms",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/icon",
  ]) {
    test(`${path} responds`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBe(true);
    });
  }
});

test("home CTAs route to contact and platform", async ({ page, isMobile }) => {
  await page.goto("/");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menuPlatformLink = page
      .getByRole("banner")
      .getByRole("link", { name: "Platform" });
    await expect(menuPlatformLink).toBeVisible();
    await menuPlatformLink.click();
    await expect(page).toHaveURL(/\/platform$/);
    return;
  }

  await expect(page.getByRole("link", { name: "Book a Consultation" })).toHaveAttribute(
    "href",
    "/contact",
  );
  await page.getByRole("link", { name: /SaaS Platform/ }).click();
  await expect(page).toHaveURL(/\/platform$/);
});

test("contact form submits through lead endpoint", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    const body = route.request().postDataJSON();
    expect(body.type).toBe("contact");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Your request has been sent. We'll reply shortly.",
      }),
    });
  });

  await page.goto("/contact");
  await page.getByLabel("Name").fill("Aisha Khan");
  await page.getByLabel("Work email").fill("aisha@example.com");
  await page.getByLabel("Company").fill("Northstar Clinic");
  await page.getByLabel("What should we automate?").selectOption("WhatsApp Automation & Bots");
  await page
    .getByLabel("Project details")
    .fill("We want to automate appointment reminders and common questions.");
  await page.getByRole("button", { name: "Send consultation request" }).click();
  await expect(page.getByRole("status")).toContainText("request has been sent");
});

test("waitlist form submits through lead endpoint", async ({ page }) => {
  await page.route("**/api/leads", async (route) => {
    const body = route.request().postDataJSON();
    expect(body.type).toBe("waitlist");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "You're on the platform waitlist. We'll be in touch.",
      }),
    });
  });

  await page.goto("/platform");
  await page.getByLabel("Name").fill("Omar Saleh");
  await page.getByLabel("Work email").fill("omar@example.com");
  await page.getByLabel("Company").fill("Atlas Ops");
  await page
    .getByLabel("What would you want the platform to automate?")
    .fill("Lead routing and CRM updates.");
  await page.getByRole("button", { name: "Join waitlist" }).click();
  await expect(page.getByRole("status")).toContainText("platform waitlist");
});
