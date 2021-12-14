"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTemplate = exports.allTemplates = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const chalk_1 = require("chalk");
const ora_1 = require("ora");
const gh = require("parse-github-url");
const request = require("request");
const tar = require("tar");
const tmp = require("tmp");
const communityTemplates_1 = require("./communityTemplates");
/**
 * available templates
 */
exports.allTemplates = [
    {
        name: 'apollo-fullstack-react-postgres-ts',
        description: 'Apollo GraphQL Server connecting to Postgres database and React client using TypeScript',
        repos: [
            {
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-react-apollo-client',
                mountpath: "client"
            }, {
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-apollo-postgres-backend',
            }
        ]
    },
    {
        name: 'fastify-fullstack-react-mongo-ts',
        description: 'GraphQL Server based on Fastify connecting to MongoDB database and React client using TypeScript',
        /**
         * Keeping this template disabled until the following issue is fixed or investigated further:
         * https://github.com/aerogear/graphback/issues/2174
         */
        disabled: true,
        repos: [
            {
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-react-apollo-client',
                mountpath: "client"
            }, {
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-fastify-mongodb-backend',
            }
        ]
    },
    {
        name: 'apollo-mongo-server-ts',
        description: 'Apollo GraphQL Server connecting to Mongo database using TypeScript',
        repos: [{
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-apollo-mongodb-backend',
            }]
    },
    {
        name: 'fastify-mongo-server-ts',
        description: 'GraphQL Server based on Fastify connecting to MongoDB database using TypeScript',
        /**
         * Keeping this template disabled until the following issue is fixed or investigated further:
         * https://github.com/aerogear/graphback/issues/2174
         */
        disabled: true,
        repos: [{
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-fastify-mongodb-backend',
            }]
    },
    {
        name: 'apollo-mongo-datasync-server-ts',
        description: 'Apollo GraphQL Server connecting to Mongo database using TypeScript. Contains Data Synchronization features.',
        repos: [{
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-apollo-mongodb-datasync-backend',
            }]
    },
    {
        name: 'apollo-postgres-server-ts',
        description: 'Apollo GraphQL Server connecting to Postgres database using TypeScript',
        repos: [{
                uri: 'https://github.com/aerogear/graphback',
                branch: 'templates-1.0.0',
                path: '/templates/ts-apollo-postgres-backend',
            }]
    }
];
communityTemplates_1.externalTemplates.forEach((template) => (template.name = `[Community] ${template.name}`));
exports.allTemplates = exports.allTemplates.concat(communityTemplates_1.externalTemplates);
/**
 * Get github repository information of template
 * @param template template information provided
 */
function getTemplateRepositoryTarInformation(repo) {
    const meta = gh(repo.uri);
    const uri = [
        `https://api.github.com/repos`,
        meta.repo,
        'tarball',
        repo.branch,
    ].join('/');
    return { uri, files: repo.path };
}
/**
 * download tar file from repository
 * @param tarInfo repository info
 */
function downloadRepository(tarInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default(`Downloading starter from ${chalk_1.default.cyan(tarInfo.uri)}`).start();
        const tmpPath = tmp.fileSync({
            postfix: '.tar.gz',
        });
        // tslint:disable-next-line: typedef
        yield new Promise((resolve) => {
            request(tarInfo.uri, {
                headers: {
                    'User-Agent': 'aerogear/graphback-cli',
                },
            })
                .pipe(fs_1.createWriteStream(tmpPath.name))
                .on('close', resolve);
        });
        spinner.succeed();
        return tmpPath.name;
    });
}
/**
 * extract the downloaded file into the output path
 * @param file downloaded file from repo
 * @param repo repository information
 * @param output output path
 */
function extractStarterFromRepository(file, repo, output) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default(`Extracting content to ${chalk_1.default.cyan(output)}`);
        yield tar.extract({
            file: file,
            cwd: output,
            filter: (path) => RegExp(repo.files).test(path),
            strip: repo.files.split('/').length,
        });
        spinner.succeed();
        return;
    });
}
/**
 * download and extract template from repository into project folder
 * @param template template information
 * @param name name of project folder
 */
function extractTemplate(template, name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (const repo of template.repos) {
            const tarInfo = getTemplateRepositoryTarInformation(repo);
            const file = yield downloadRepository(tarInfo);
            repo.mountpath = repo.mountpath || "";
            const output = `${process.cwd()}/${name}/${repo.mountpath}`;
            if (!fs_1.existsSync(output)) {
                fs_1.mkdirSync(output);
            }
            yield extractStarterFromRepository(file, tarInfo, output);
        }
    });
}
exports.extractTemplate = extractTemplate;
//# sourceMappingURL=starterTemplates.js.map