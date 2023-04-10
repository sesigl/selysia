<h1>Selysia</h1>
Welcome to Selysia, a SaaS product that allows you to schedule and publish content for multiple platforms intelligently
with a single click to maximize your reach. Selysia uses AI-based inspiration and optimization to help you plan the
content you create and hit the taste of your audience. Queue content ahead to maximize your efficiency with the ideal
volume at the right time. Selysia will handle the publishing for you on different platforms using the perfect format for
your content.
<h2>Technologies</h2>
Selysia is a monorepo containing two applications: a frontend built with Next.js and TypeScript and a backend built with
GoLang deployed to AWS Lambda via the Serverless Framework.
<h3>Frontend Technologies</h3>
The following technologies are used in the frontend:
<ul>
    <li>Next.js</li>
    <li>TypeScript</li>
    <li>Prisma</li>
    <li>AWS SES for emails</li>
    <li>CockroachDB as a database</li>
</ul>
<h3>Backend Technologies</h3>
The following technologies are used in the backend:
<ul>
    <li>GoLang</li>
    <li>Golang-migrate</li>
    <li>AWS Lambda Go</li>
    <li>Serverless Framework</li>
    <li>OpenAPI spec</li>
    <li>ChatGPT API</li>
    <li>Wire for dependency injection</li>
    <li>Testcontainers-go for testing CockroachDB</li>
    <li>CockroachDB as a database</li>
    <li>Golang-jwt to verify JWT tokens directly from requests from the frontend</li>
    <li>Redis for rate limiting and Go-redis as client</li>
</ul>
<h3>Authentication</h3>
For authentication and authorization, `auth.js` is used to support authentication for Google, Twitter, Instagram,
Facebook, LinkedIn, and Github. The JWT token is created via Next.js in the backend but is also verified via GoLang
backend. Requests can either go from backend to backend or directly from the frontend to the backend. The JWT token is
passed as a header, hence response latency is very low when requests do not need to go through Next.js first.
<h2>Repository</h2>
This repository contains all the code for Selysia. The client and server code is generated using OpenAPI. The API spec
becomes like a compile-time safe contract.
<h2>Deployment</h2>
The frontend is deployed via Vercel, while the backend is deployed to AWS Lambda via the Serverless Framework.
<h2>Contributing</h2>
This project is on hold.
<h2>License</h2>
All project-specific (not design template) code is MIT license, but the
template you need to buy if you want to use it via <a href="https://cruip.com/" target="_new">https://cruip.com/</a>.