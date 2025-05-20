var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import session from "express-session";
import connectPg from "connect-pg-simple";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  caseStudies: () => caseStudies,
  contactMessages: () => contactMessages,
  insertCaseStudySchema: () => insertCaseStudySchema,
  insertContactSchema: () => insertContactSchema,
  insertSettingSchema: () => insertSettingSchema,
  insertUserSchema: () => insertUserSchema,
  siteSettings: () => siteSettings,
  users: () => users
});
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  clientName: text("client_name").notNull(),
  clientIndustry: text("client_industry").notNull(),
  duration: text("duration"),
  services: text("services").array().notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  result: text("result").notNull(),
  images: text("images").array(),
  technologies: text("technologies").array(),
  testimonial: text("testimonial"),
  testimonialAuthor: text("testimonial_author"),
  testimonialRole: text("testimonial_role"),
  featured: boolean("featured").default(false),
  publishDate: timestamp("publish_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  description: text("description"),
  category: text("category").notNull(),
  type: text("type").notNull(),
  // text, number, boolean, json, etc.
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isAdmin: true
});
var insertCaseStudySchema = createInsertSchema(caseStudies).pick({
  title: true,
  slug: true,
  excerpt: true,
  description: true,
  coverImage: true,
  clientName: true,
  clientIndustry: true,
  duration: true,
  services: true,
  challenge: true,
  solution: true,
  result: true,
  images: true,
  technologies: true,
  testimonial: true,
  testimonialAuthor: true,
  testimonialRole: true,
  featured: true
});
var insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var insertSettingSchema = createInsertSchema(siteSettings).pick({
  key: true,
  value: true,
  description: true,
  category: true,
  type: true
});

// server/db.ts
import "dotenv/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, desc, asc } from "drizzle-orm";
var PgStore = connectPg(session);
var DatabaseStorage = class {
  sessionStore;
  constructor() {
    this.sessionStore = new PgStore({
      pool,
      createTableIfMissing: true
    });
  }
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Case study operations
  async getCaseStudy(id) {
    const [study] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return study;
  }
  async getCaseStudyBySlug(slug) {
    const [study] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return study;
  }
  async getCaseStudies(limit, featured) {
    if (featured !== void 0) {
      if (limit) {
        return await db.select().from(caseStudies).where(eq(caseStudies.featured, featured)).orderBy(desc(caseStudies.publishDate)).limit(limit);
      } else {
        return await db.select().from(caseStudies).where(eq(caseStudies.featured, featured)).orderBy(desc(caseStudies.publishDate));
      }
    } else {
      if (limit) {
        return await db.select().from(caseStudies).orderBy(desc(caseStudies.publishDate)).limit(limit);
      } else {
        return await db.select().from(caseStudies).orderBy(desc(caseStudies.publishDate));
      }
    }
  }
  async createCaseStudy(caseStudy) {
    const [study] = await db.insert(caseStudies).values(caseStudy).returning();
    return study;
  }
  async updateCaseStudy(id, caseStudy) {
    const [updated] = await db.update(caseStudies).set({ ...caseStudy, updatedAt: /* @__PURE__ */ new Date() }).where(eq(caseStudies.id, id)).returning();
    return updated;
  }
  async deleteCaseStudy(id) {
    const result = await db.delete(caseStudies).where(eq(caseStudies.id, id)).returning();
    return result.length > 0;
  }
  // Contact message operations
  async getContactMessages(limit, unreadOnly) {
    if (unreadOnly) {
      if (limit) {
        return await db.select().from(contactMessages).where(eq(contactMessages.read, false)).orderBy(desc(contactMessages.createdAt)).limit(limit);
      } else {
        return await db.select().from(contactMessages).where(eq(contactMessages.read, false)).orderBy(desc(contactMessages.createdAt));
      }
    } else {
      if (limit) {
        return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(limit);
      } else {
        return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      }
    }
  }
  async getContactMessage(id) {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }
  async createContactMessage(message) {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }
  async markMessageAsRead(id) {
    const result = await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id)).returning();
    return result.length > 0;
  }
  async deleteContactMessage(id) {
    const result = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning();
    return result.length > 0;
  }
  // Settings operations
  async getSetting(key) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }
  async getSettingsByCategory(category) {
    return await db.select().from(siteSettings).where(eq(siteSettings.category, category)).orderBy(asc(siteSettings.key));
  }
  async getAllSettings() {
    return await db.select().from(siteSettings).orderBy(asc(siteSettings.category), asc(siteSettings.key));
  }
  async saveSetting(setting) {
    const existing = await this.getSetting(setting.key);
    if (existing) {
      const [updated] = await db.update(siteSettings).set({ ...setting, updatedAt: /* @__PURE__ */ new Date() }).where(eq(siteSettings.key, setting.key)).returning();
      return updated;
    } else {
      const [created] = await db.insert(siteSettings).values(setting).returning();
      return created;
    }
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
  const sessionSettings = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  app2.post("/api/auth/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        email,
        isAdmin: true
        // For now, all registered users are admins
      });
      const { password: _, ...userWithoutPassword } = user;
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(userWithoutPassword);
      });
    } catch (err) {
      next(err);
    }
  });
  app2.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ error: info?.message || "Authentication failed" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });
  app2.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
  app2.use("/api/admin/*", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }
    next();
  });
}

// server/email.ts
import sgMail from "@sendgrid/mail";
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set. Email functionality will not work.");
} else {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  } catch (error) {
    console.error("Error setting SendGrid API key:", error);
    console.warn('Please ensure your SendGrid API key is valid and starts with "SG."');
  }
}
async function sendEmail(emailData) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error("Cannot send email: SENDGRID_API_KEY not set");
      return false;
    }
    if (emailData.from !== "talal.ahmad.qamar@gmail.com") {
      console.error("Invalid sender email. Must use a verified sender.");
      return false;
    }
    if (process.env.NODE_ENV === "development") {
      console.log("==== EMAIL WOULD BE SENT (DEVELOPMENT MODE) ====");
      console.log("To:", emailData.to);
      console.log("From:", emailData.from);
      console.log("Subject:", emailData.subject);
      console.log("Text:", emailData.text);
      return true;
    }
    try {
      await sgMail.send(emailData);
      console.log("Email sent successfully to", emailData.to);
      return true;
    } catch (sendError) {
      console.error("SendGrid error:", sendError?.response?.body || sendError);
      return false;
    }
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    return false;
  }
}
async function sendContactFormEmail(name, email, subject, message) {
  const adminEmail = "talal.ahmad.qamar@gmail.com";
  const emailData = {
    to: adminEmail,
    from: adminEmail,
    // Must be a verified sender in SendGrid
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `
  };
  return await sendEmail(emailData);
}
async function sendNewCaseStudyNotification(title, slug, client) {
  const adminEmail = "talal.ahmad.qamar@gmail.com";
  const emailData = {
    to: adminEmail,
    from: adminEmail,
    subject: `New Case Study Added: ${title}`,
    text: `
      A new case study has been added to your portfolio:
      
      Title: ${title}
      Client: ${client}
      URL: /case-studies/${slug}
    `,
    html: `
      <h2>New Case Study Added</h2>
      <p>A new case study has been added to your portfolio:</p>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Client:</strong> ${client}</p>
      <p><strong>URL:</strong> <a href="/case-studies/${slug}">/case-studies/${slug}</a></p>
    `
  };
  return await sendEmail(emailData);
}

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  setupAuth(app2);
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const savedMessage = await storage.createContactMessage(contactData);
      const emailSent = await sendContactFormEmail(
        contactData.name,
        contactData.email,
        contactData.subject,
        contactData.message
      );
      if (emailSent) {
        res.status(201).json({
          success: true,
          message: "Your message has been sent!",
          data: savedMessage
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Your message was received but there was an issue sending the email notification.",
          data: savedMessage
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request."
        });
      }
    }
  });
  app2.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies2 = await storage.getCaseStudies();
      res.json(caseStudies2);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });
  app2.get("/api/case-studies/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const caseStudy = await storage.getCaseStudyBySlug(slug);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ error: "Failed to fetch case study" });
    }
  });
  app2.get("/api/admin/case-studies", async (req, res) => {
    try {
      const caseStudies2 = await storage.getCaseStudies();
      res.json(caseStudies2);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });
  app2.get("/api/admin/case-studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const caseStudy = await storage.getCaseStudy(id);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ error: "Failed to fetch case study" });
    }
  });
  app2.post("/api/admin/case-studies", async (req, res) => {
    try {
      const caseStudyData = insertCaseStudySchema.parse(req.body);
      const createdCaseStudy = await storage.createCaseStudy(caseStudyData);
      await sendNewCaseStudyNotification(
        createdCaseStudy.title,
        createdCaseStudy.slug,
        createdCaseStudy.clientName
      );
      res.status(201).json(createdCaseStudy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Invalid case study data",
          details: error.errors
        });
      } else {
        console.error("Error creating case study:", error);
        res.status(500).json({ error: "Failed to create case study" });
      }
    }
  });
  app2.put("/api/admin/case-studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const caseStudyData = insertCaseStudySchema.partial().parse(req.body);
      const updatedCaseStudy = await storage.updateCaseStudy(id, caseStudyData);
      res.json(updatedCaseStudy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Invalid case study data",
          details: error.errors
        });
      } else {
        console.error("Error updating case study:", error);
        res.status(500).json({ error: "Failed to update case study" });
      }
    }
  });
  app2.delete("/api/admin/case-studies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCaseStudy(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Case study not found" });
      }
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({ error: "Failed to delete case study" });
    }
  });
  app2.get("/api/admin/messages", async (req, res) => {
    try {
      const unreadOnly = req.query.unread === "true";
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const messages = await storage.getContactMessages(limit, unreadOnly);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  app2.get("/api/admin/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getContactMessage(id);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      console.error("Error fetching message:", error);
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });
  app2.put("/api/admin/messages/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markMessageAsRead(id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });
  app2.delete("/api/admin/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContactMessage(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  });
  app2.get("/api/admin/settings", async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });
  app2.get("/api/admin/settings/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const settings = await storage.getSettingsByCategory(category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings by category:", error);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });
  app2.put("/api/admin/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { value, category, type = "text", description = "" } = insertSettingSchema.parse(req.body);
      const setting = await storage.saveSetting({ key, value, category, type, description });
      res.json(setting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Invalid setting data",
          details: error.errors
        });
      } else {
        console.error("Error saving setting:", error);
        res.status(500).json({ error: "Failed to save setting" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "/taq-portfolio/public/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = parseInt(process.env.PORT || "3000", 10);
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
