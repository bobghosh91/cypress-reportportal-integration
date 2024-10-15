# Cypress ReportPortal Integration Framework

## Table of Contents
[Introduction](#introduction)</br>
[Key Features](#key-features)</br>
[Prerequisites](#prerequisites)</br>
[Setup Instructions](#setting-up-reportportal-with-docker-compose)</br>
    - [Clone or Download the Repository]()</br>
    - [Install Dependencies]()</br>
    - [Docker Compose Configuration]()</br>
    - [Running ReportPortal]()</br>
    - [Accessing ReportPortal]()</br>
    - [Cypress Configuration]()</br>
    - [Run Tests]()</br>
[Changing the ReportPortal Port](#changing-the-reportportal-port)</br>
[Adding More Tests](#adding-more-tests)</br>
[Contributing](#contributing)</br>


## Introduction
This project demonstrates a Cypress testing framework integrated with [ReportPortal](https://reportportal.io) for enhanced test reporting and monitoring. The key objective is to showcase how Cypress can be connected with ReportPortal via Docker Compose, with a special configuration to avoid port conflicts (e.g., running on port 9090 when Jenkins is using port 8080).

## Key Features
1. **Cypress:** A powerful end-to-end testing framework, ideal for fast, reliable web application testing.
2. **ReportPortal Integration:** Automatically logs test executions to ReportPortal, offering detailed reports and insights on test runs.
3. **Real-time Monitoring:** View test results and logs in real-time as they are executed in Cypress, whether running locally or in a CI environment.
4. **Docker Compose Setup:** Simple Docker Compose setup for running ReportPortal on a configurable port.
5. **Custom Port Configuration:** Runs ReportPortal on a different port (port: 9090) to avoid conflicts with other services (e.g., Jenkins running on 8080).

## Prerequisites

Before setting up and running the project, ensure you have the following installed:

- Node.js: (v18.x or higher)
- Cypress (v13.x.0 or higher)
- Docker and Docker Compose
- ReportPortal instance (using Docker Compose)

## Setting Up ReportPortal with Docker Compose

The project includes a `docker-compose.yml` file for setting up ReportPortal. The configuration allows you to run ReportPortal on a custom `port 9090`, especially useful if Jenkins or another service is occupying port 8080.

1. **Clone or Download the Repository:**
    - Clone or download the repo and open in any IDE of choice(VScode preferred).
    ```bash
    git clone https://github.com/bobghosh91/cypress-reportportal-integration.git

    cd repo-name
    ```
2. **Install Dependencies:**
    - download the dependenvy package by:
    ```bash
        npm install
    ```

3. **Docker Compose Configuration:**
The `docker-compose.yml` file is located in the root folder of the project. It is pre-configured to run ReportPortal on port 9090 to avoid conflicts with Jenkins (which uses 8080).

4. **Running ReportPortal:**
    ```bash
    docker-compose -f docker-compose.yml up -d
    ```
    > This will launch ReportPortal on http://localhost:9090/ui. You can change the port by editing the docker-compose.yml file if needed.

5. **Accessing ReportPortal:**

    Once ReportPortal is up and running, you can access it via:
    `http://localhost:9090`
    - Username: superadmin
    - Password: erebus

6. **Cypress Configuration:**
    -   Update the `cypress.config.js` file to include ReportPortal configurations:
    ```json
    {
        apiKey: '<your-reportportal-api-key>',
        endpoint: 'http://localhost:5500/api/v1',
        project: '<your-custom-project-name>',
        launch: '<<your-custom-launch-name>>',
        description: 'automation of aut',
        attributes:[
            { key: 'runDate', value: new Date().toISOString().split('T')[0]},
            ],
        debug:false,
        uploadVideo:true,
        uploadVideoForNonFailedSpec:false,
        autoMerge: true,
    }
    ```
    > **NOTE:** once you login to reportportal and create a project, you will be provided with the key. replace the `apikey` here and along with that provide a suitable project name and launch name. This launch name will be further used to design various dashboards.

    > For more configuration details, visit the [cypress-agent](https://github.com/reportportal/agent-js-cypress) GitHub page.

7. **Run Tests:**
    - To run the Cypress tests and automatically push results to ReportPortal, use the following command:
    ```
    npx cypress run
    ```
    > **NOTE:** you can also take advantage of scripts in `package.json` to run tests. Several examples are included in the same file.


Test results will be sent to ReportPortal, where you can view logs, screenshots, and execution details.

## Changing the ReportPortal Port
To run ReportPortal on a different port, edit the `docker-compose.yml` file, and replace the port mapping:
```
ports:
  - "your_port:8080"
```
For example, to run it on port 9090 (default):

```
ports:
  - "9090:8080"
```

## Adding More Tests
To add more tests, simply create new test files under the `cypress/e2e` folder.

### Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

Happy Testing!