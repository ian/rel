"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const chalk_1 = require("chalk");
const figlet = require("figlet");
const inquirer_1 = require("inquirer");
const utils_1 = require("../utils");
const starterTemplates_1 = require("./starterTemplates");
/**
 * Check if directory exists
 * @param path path of the directory
 * @param name name of the project folder
 */
function checkDirectory(path, name) {
    try {
        fs_1.accessSync(path);
        utils_1.logError(`A folder with name ${name} exists. Remove it or try another name.`);
        process.exit(0);
    }
    catch (error) {
        return;
    }
}
/**
 * choose a template from available templates
 */
function chooseTemplate(filter = '') {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const regex = new RegExp(`.*${filter}.*`, 'i');
        const displayedTemplates = starterTemplates_1.allTemplates.filter((template) => !template.disabled && regex.test(`${chalk_1.default.green(template.name)} ${template.description}`));
        if (!displayedTemplates.length) {
            utils_1.logInfo(`create-graphback could not find templates matching the given filter: "${filter}".
You can either change the given filter or not pass the option to display the full list.`);
            process.exit(0);
        }
        utils_1.logInfo(`${chalk_1.default.cyan('create-graphback')} can create your app from following templates:
  ${displayedTemplates
            .map((template) => {
            return `\n${chalk_1.default.green(template.name)}: \n${template.description}`;
        })
            .join('\n')}
  `);
        const { templateName } = yield inquirer_1.prompt([
            {
                type: 'list',
                name: 'templateName',
                message: 'Choose a template to bootstrap',
                choices: displayedTemplates.map((t) => t.name)
            }
        ]);
        return displayedTemplates.find((t) => t.name === templateName);
    });
}
/**
 * check if template name is valid or not
 * @param templateName name of the template provided
 */
function checkTemplateName(templateName) {
    const availableTemplates = starterTemplates_1.allTemplates.map((t) => t.name);
    if (availableTemplates.includes(templateName)) {
        return;
    }
    utils_1.logError("Template with given name doesn't exist. Give one of available ones or simply choose by not providing a template name");
    process.exit(0);
}
/**
 * assign template details from the given input or choice
 * @param templateName name of the template provided(if any)
 */
function assignTemplate(templateName, filter) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let template;
        if (templateName) {
            checkTemplateName(templateName);
            template = starterTemplates_1.allTemplates.find((t) => t.name === templateName);
        }
        else {
            template = yield chooseTemplate(filter);
        }
        return template;
    });
}
function postSetupMessage(name) {
    return `
GraphQL server successfully bootstrapped :rocket:

Next Steps:
1. Change directory into project folder - ${chalk_1.default.cyan(`cd ${name}`)}
2. Follow template README.md to start server
`;
}
/**
 * Build template from user provided url
 */
function buildTemplateFromGithub(templateUrl) {
    const url = templateUrl.split('#');
    return {
        name: 'Users Github template',
        description: 'User provided template',
        repos: [
            {
                uri: url[0],
                branch: url[1] || 'master',
                path: '/'
            }
        ]
    };
}
/**
 * init command handler
 * @param name name of project folder
 * @param templateName name of the template provided(if any)
 * @param templateUrl github url to the template
 */
function init(name, templateName, templateUrl, filter) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        utils_1.logInfo(chalk_1.default.yellow(figlet.textSync('Graphback', { horizontalLayout: 'full' })));
        const path = `${process.cwd()}/${name}`;
        checkDirectory(path, name);
        let template;
        if (templateUrl) {
            template = buildTemplateFromGithub(templateUrl);
        }
        else {
            template = yield assignTemplate(templateName, filter);
        }
        fs_1.mkdirSync(path);
        utils_1.logInfo(`
Bootstraping graphql server :dizzy: :sparkles:`);
        yield starterTemplates_1.extractTemplate(template, name);
        process.chdir(name);
        utils_1.logInfo(postSetupMessage(name));
    });
}
exports.init = init;
//# sourceMappingURL=components.js.map