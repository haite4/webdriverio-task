# WebdriverIO + GitHub Actions

## Introduction
This project uses WebdriverIO to test a web application, with 20 test cases covering critical user flows on the Login, Inventory, Cart, and Checkout pages. These tests ensure the application's functionality and quickly identify issues.

Integrated with GitHub Actions for continuous testing, the project generates test results using Allure Reports, which are then published to GitHub Pages for easy access.

## Steps to Install
1. Install Nodejs:

    [Nodejs](https://nodejs.org/en/download/package-manager)

2. Clone the repository:
    ```sh
    git clone https://github.com/haite4/webdriverio-task
    ```
3. Navigate to the project directory:
    ```sh 
    cd webdriverio-task
    ```

4. Install dependencies:
    ```sh
    npm install 
    ``` 

## Steps to Launch

1. **Run all tests in headless Chrome:**:
    ```sh
    npm run test
    ```
2. **Run all tests in all supported browsers:**
    ```sh
    npm run test:all
    ```
3. **Run inventory tests:**
    ```sh
    npm run test:inventory
    ```
4. **Run login tests:**
    ```sh
    npm run test:login
    ```
5. **Run cart tests:**
    ```sh
    npm run test:cart
    ```
6. **Run checkout step one tests:**
    ```sh
    npm run test:checkout:step:one
    ```
7. **Run tests in headless Firefox:**
    ```sh
    npm run test:firefox:headless
    ```
8. **Run all tests in Firefox:**
    ```sh
    npm run test:firefox
    ```
9. **Run tests in headless Chrome:**
    ```sh
    npm run test:chrome:headless
    ```
10. **Run all tests in Chrome:**
    ```sh
    npm run test:chrome
    ```
11. **Run tests in headless Edge:**
    ```sh
    npm run test:edge:headless
    ```
12. **Run all tests in Edge:**
    ```sh
    npm run test:edge
    ```


## Generate Allure Report: 

1. **After running your tests, generate the Allure report using:**
    ```sh
    npm run allure:generate
    ```

2. **View the Allure Report: To view the report locally:**
    ```sh
    npm run allure:serve
    ```


## GitHub Actions Integration

The GitHub Actions workflow is configured to automatically run the WebdriverIO test suites. After the tests are executed, the results are published to GitHub Pages using Allure Reports. You can view the test results at the following link:

[View Test Results](https://haite4.github.io/webdriverio-task/)

### Summary
- **Test Coverage:**: The project includes 20 test cases that cover essential features of the Login, Inventory, Cart, and Checkout pages.
- **GitHub Actions Workflow:**: The workflow runs WebdriverIO tests in a headless Chrome browser and generates test reports.
- **Result Publication:**: Test results are automatically published to GitHub Pages, making them easily accessible online.