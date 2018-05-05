import * as inquirer from 'inquirer';

export default {
  askSupportTs(): Promise<inquirer.Answers> {
    return inquirer.prompt([{
      name: 'supportTs',
      type: 'confirm',
      message: 'Is typescript used in this project or not, default is No:',
      default: false,
    }]);
  },
  askIfORNot(question: string, defaultValue: boolean = true): Promise<inquirer.Answers> {
    return inquirer.prompt([{
      name: 'yesOrNot',
      type: 'confirm',
      message: question,
      default: defaultValue,
    }]);
  },
  askForAnswer(question: string): Promise<inquirer.Answers> {
    return inquirer.prompt([{
      name: 'answer',
      type: 'input',
      message: question,
    }]);
  },
};
