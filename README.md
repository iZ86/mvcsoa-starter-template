# 📦 mvcsoa-starter-template

This is a personal NodeJS starter template that follows the MVC + Service Oriented Architecture + Repository Pattern, and also includes other utility patterns such as Result, and wrappers for express. The purpose of this starter template is just for easier development.

Made by iZ86 and SkyFoo


---

## 🧱 Architecture Overview

This project follows a **Model-View-Controller (MVC)** pattern combined with a **Service-Oriented Architecture (SOA)**, built with **Node.js** and **TypeScript**. It also incorporates **Result** and **Repository** pattern, along with custom wrappers.

```
app/                                # application layer containing:
├── config/                         # config for external services and others, also including env
├── database/                       # db connection
├── features/                       # domain driven design file structure for mvcsoa
│   └── <domain>/
│       ├── <domain>-controller.ts  # controller for the domain
│       ├── <domain>-enums.ts       # any enums that may be used by the domain
│       ├── <domain>-model.ts       # model for the domain
│       ├── <domain>-repository.ts  # repository for the domain
│       ├── <domain>-routes.ts     # routes for the domain
│       ├── <domain>-service.ts     # service for the domain
│       └── <domain>-validator.ts   # domain validation for HTTP requests
├── middlewares/                    # any middleware to be used in domain routes
├── routes/                         # handles routes of all the domain endpoints
├── utils/                          # utility functions to be used by domain
└── index.ts                        # server config
libs/                               # external libraries
```

---

## 🚀 Getting Started

### Prerequisites

- Any NodeJS version.
- npm

### Installation

Can either clone or fork it.


### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

---

## 📁 Project Structure

### `app/config/config.ts`

This directory centralizes all configuration for external services and serves as the sole location for loading values from the .env file.

---

### `app/database/db-connection.ts`

This directory is responsible for establishing and managing connections to the selected database.

---

### `app/middlewares/`

Contains middlewares used across the application.

Example:
| File | Description |
|------|-------------|
| `auth.ts` | _[e.g., JWT authentication / session guard]_ |
| `validate.ts` | _[e.g., Request validation middleware utilizing express-validator]_ | 

---

### `app/utils/utils.ts`

This directory is for storing utility functions to be used across the application.

It currently contains asyncHandler which is used to handle async methods that are called within express routing methods.

---

### `app/routes/routes.ts`

This file is used to handle all the routes of the domains.

---

### `app/index.ts`

Server configuration such as cors, json handlers, and global middlewares such as current error middleware and invalid JSON format middleware.



---

## 🧩 Features

Features are self-contained modules under `app/features/<domain-name>/`. Each feature follows the same structure:

| File | Role |
|------|------|
| `*-controller.ts` | Handles incoming HTTP requests and delegates to the service layer |
| `*-service.ts` | Contains the business logic, **can be used across service layer** in other domains. |
| `*-repository.ts` | Handles all database queries / data access |
| `*-model.ts` | Defines the data model / schema / datatype, **can be used across** other domains. |
| `*-routes.ts` | Declares the route definitions for the domain |
| `*-validator.ts` | Validates incoming request data, **can be used across** other domains. |
| `*-enums.ts` | Contains enums specific to the domain. However, **can be used across** other domains. |


Example:

- **User** — Handles user related domain.

---

## 📚 Libs

Shared libraries used across the application.

Currently contains:

### `libs/express-enhancer.ts`

Wrapper for express response method res.status.json for simpler and easier development.

### `libs/Result.ts`

Used to return a standardized result from service layer to controller, follow the Result Pattern.

### `libs/ResultType.ts`

An experimental version of Result.ts that provides stronger type safety. It is currently somewhat verbose, but may provide better flow compared to Result.ts under certain conditions.

### `libs/status-codes-enums.ts`

Enums for status codes.

---

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Run the compiled production build |

---

## ✨ Template Usage Examples

[SEG2202SE-aZone](https://github.com/iZ86/SEG2202SE-aZone) *Older version of the template


## 📄 License

[MIT](./LICENSE)

## 📠 Contacts

iZ86 - [GitHub](https://github.com/iZ86) - [LinkedIn](https://www.linkedin.com/in/isaac-yeow/)

SkyFoo - [GitHub](https://github.com/skyfoojs) - [LinkedIn](https://www.linkedin.com/in/foo-jia-seng-1629112b6/)

## 🤔 2 Cents (Reasoning/Thoughts regarding choices of design)
This repo/template isn't a one-size-fits-all solution, and may require changes based on your own personal design choices. It is designed based on my experience with NodeJS, MVC and SOA, and may evolve over time.

### Result Pattern

Didn't like returning custom objects from service layer to the controller. Not only that, since this is TypeScript which contains type-safety. Did not want to excessively use the `any` type, so decided to adopt the Result Pattern to make the flow from service to controller more standardized and predictable.


### Domain Driven Design File Structure

Used both normal MVC driven file structure, where files are grouped by service, repository, controller, model, etc, and domain driven file structure. Found that domain driven file structure feels neater, and helps with development and scalability making it more easier.


### Express-Enhancer

This is just a wrapper that is used to send a standardized response, since all of the responses have the same format.

### Models, Services, Validators, and Enums allowed to be used across domains.

Some domains may interact with other domains. For example, a Student may be allowed to enroll into a Programme.
As such, in the Programme service layer, there may need to call the Student service layer to verify the validity of the studentId given. 

For example:
```
POST api/v1/programme/enroll

{
    studentId: 1,
    programmeId: 1
}

```

This prevents redundant similar types of codes from being spread across the domains.







