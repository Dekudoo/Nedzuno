import { EmbedBuilder } from "discord.js";

export const helper = async (ru, en, interaction, category, member) => {
    try {
        let general;
        let moderation;
        let economic;
        let fun;
        let spam;
        let support;
        let all;

        if(ru) {
            general = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Nedzuno general commands guide!")
            .setDescription(`
            \`/avatar\` - ты можешь прописать /avatar и ввести юзера, если захочешь. Если не веедешь юзера - выведется твоя аватарка, если введешь - выведется аватарка выбранного юзера \n
            \`/dm\` - ты можешь прописать /dm и ввести юзера и сообщение. Комманда отправит ботов введенное сообщение выбраному юзеру прямо в лс
            `)
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
        
            moderation = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno moderation commands guide!")
                .setDescription(`
                \`/bye\` - вы можете выгнать выбранного пользователя с помощью этой команды, если у вас есть права на это \n
                \`/clear\` - вы можете очистить выбранное количество сообщений, если у вас есть на это права \n
                \`/mute\` - вы можете замутить выбранного пользователя на выбранное время в минутах, если у вас есть права на это \n 
                \`/unmute\` - вы можете размутить звук выбранного пользователя, если у вас есть на это права \n
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            economic = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno economic commands guide!")
                .setDescription(`
                \`/job\` - вы можете зарегистрировать своего пользователя в базе данных. Без этого экономика работать не будет. Сначала можно выбрать только 3 профессии: Психолог, Строитель, Студент. Вы должны зарабатывать коины и покупать более высокие должности с более высокой зарплатой, а затем вы сможете создать свою собственную роль! \n
                \`/work\` - вы можете заработать коины используя эту комманду. Вы можете использовать эту команду только 1 раз в час \n
                \`/worktime\` - вы можете проверить, сколько времени вам нужно подождать, прежде чем использовать команду \`/work\` \n
                \`/avaible\` - вы можете просмотреть работы, на которые вам хватит коинов \n
                \`/balance\` - вы можете просмотреть баланс (количество коинов) \n
                \`/give\` - вы можете дать коины выбраному юзеру \n
                \`/ownrole\` - вы можете создать свою собственную роль, со своим именем и своим цветом! Вам нужна работа «Программист» или «Инженер» чтобы использовать эту комманду. Также вам нужно 5000 монет. Вы можете использовать эту команду только один раз
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            fun = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Nedzuno fun commands guide!")
            .setDescription(`
            \`/ball\` - вы можете задать вопрос и бот вам ответит \n
            \`/say\` - вы можете отправить сообщение ботом \n
            \`/who\` - вы можете задать вопрос, и он вам ответит. Например: /who моя мама?, ответ: @random_member моя мама
            `)
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })

            spam = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno spam commands guide!")
                .setDescription(`
                \`/setspam\` - сделать текущий канал "спамовым" (без этого нельзя использовать другие спам-команды в канале) \n
                \`/ping\` - пропинговать пользователя заданым количеством раз \n
                \`/spam\` - проспамить введенное сообщение выбранное количество раз
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            support = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno support commands guide!")
                .setDescription(`
                \`/help\` - вы уже используете его! \n
                \`/letter\` - вы можете отправить письмо разработчику бота (мне)\n
                \`/update\` - вы можете попросить меня обновить бота, используя эту команду
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            all = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno support commands guide!")
                .setDescription(`
                \`/аватар\` - вы можете ввести /аватар и выбрать пользователя, если хотите. Если не выбрать пользователя, то ваш аватар, если выбрать пользователя - команда отобразит аватар пользователя \n
                \`/dm\` - вы можете ввести /dm и выбрать пользователя + сообщение. Затем команда отправляет это сообщение непосредственно пользователю \n
                \`/bye\` - с помощью этой команды вы можете удалить выбранного пользователя, если у вас есть на это права \n
                \`/clear\` - вы можете очистить выбранное количество сообщений, если у вас есть на это права\n
                \`/mute\` - вы можете отключить звук выбранного пользователя на выбранное время в минутах, если у вас есть на это права\n
                \`/unmute\` - вы можете включить звук выбранного пользователя, если у вас есть на это права\n
                \`/job\` - вы можете зарегистрировать своего пользователя в базе данных. Без этого экономика работать не будет. Сначала можно выбрать только 3 профессии: Психолог, Строитель, Студент. Вы должны зарабатывать монеты и покупать более высокие должности с более высокой зарплатой, а затем вы сможете создать свою собственную роль! \n
                \`/work\` - с его помощью можно зарабатывать монеты. Вы можете использовать эту команду только 1 раз в час\n
                \`/worktime\` - вы можете проверить, сколько времени вам нужно подождать, прежде чем использовать команду \`/work\` \n
                \`/avaible\` - вы можете проверить доступные для вас вакансии\n
                \`/balance\` - вы можете проверить свой баланс (сколько у вас монет) \n
                \`/give\` - вы можете дать некоторое количество монет какому-либо пользователю\n
                \`/ownrole\` - вы можете создать свою собственную роль со своим именем и своим цветом! Вам нужна работа «Программист» или «Инженер», чтобы использовать это, также вам нужно 5000 монет. Вы можете использовать эту команду только один раз \n
                \`/ball\` - вы можете задать вопрос и бот вам ответит\n
                \`/say\` - вы можете отправить сообщение ботом\n
                \`/who\` - вы можете задать вопрос, и он вам ответит. Например: /who моя мама?, ответ: @random_member моя мама\n
                \`/setspam\` - сделать текущий канал "спамовым" (без этого нельзя использовать другие спам-команды в канале) \n
                \`/ping\` - пропинговать пользователя заданное количество раз \n
                \`/spam\` - проспаммить введеное сообщение выбранное количество раз \n
                \`/help\` - вы уже используете его! \n
                \`/letter\` - вы можете отправить письмо разработчику бота (мне) \n
                \`/update\` - вы можете попросить меня обновить бота, используя эту команду
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            switch(category) {
                case "general":
                    member.send({ embeds: [general]});
                    break;
                case "moderation":
                    member.send({ embeds: [moderation]});
                    break;
                case "economic":
                    member.send({ embeds: [economic]});
                    break;
                case "fun":
                    member.send({ embeds: [fun]});
                    break;
                case "spam":
                    member.send({ embeds: [spam]});
                    break;
                case "support":
                    member.send({ embeds: [support]});
                    break;
                case "all":
                    member.send({ embeds: [all]});
                    break;
            } 
        }
        if(en) {
            general = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno general commands guide!")
                .setDescription(`
                \`/avatar\` - you can type /avatar, and choose user if you want. If you don't select a user, then your avatar, if you will select user - the command will display user's avatar \n
                \`/dm\` - you can type /dm and choose user + message. Then command send this message directly to user
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
            
            moderation = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno moderation commands guide!")
                .setDescription(`
                \`/bye\` - you can kick choosen user with this coomand if you have permissions to do that \n
                \`/clear\` - you can clear choosen amount of messages if you have permissions to do that \n
                \`/mute\` - you can mute choosen user for choosen time in minutes if you have permissions to do that \n 
                \`/unmute\` - you can unmute choosen user if you have permissions to do that \n
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            economic = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno economic commands guide!")
                .setDescription(`
                \`/job\` - you can register your user in database. Without it economic won't work. First you can only select 3 jobs: Psychologist, Builder, Student. You must earn coins and buy higher jobs with higher salary, and then you can made your own role! \n
                \`/work\` - you can earn coins with it. You can use this command only 1 time in hour \n
                \`/worktime\` - you can check, how much time you need to wait before using \`/work\` command \n
                \`/avaible\` - you can check avaible jobs for you \n
                \`/balance\` - you can check your balance (how much coins do u have) \n
                \`/give\` - you can give some coins to some user \n
                \`/ownrole\` - you can create your own role, with your own name, and with your own color! You need \`Programmer\` or \`Engineer\` job to use it, also you need 5000 coins. You can use this command only one time
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            fun = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Nedzuno fun commands guide!")
            .setDescription(`
            \`/ball\` - you can ask question and bot will answer you \n
            \`/say\` - you can send some message by bot \n
            \`/who\` - you can ask question, and it will answer you. For example: /who is my mom?, answer: @random_member is my mom
            `)
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })

            spam = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno spam commands guide!")
                .setDescription(`
                \`/setspam\` - made current channel "spam channel" (without it you cant use other spam commands) \n
                \`/ping\` - ping some user with choosen amount of times \n
                \`/spam\` - spam entered message choosen amount of times
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            support = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno support commands guide!")
                .setDescription(`
                \`/help\` - you already use it! \n
                \`/letter\` - you can send letter to a bot developer (me) \n
                \`/update\` - you can ask me to update bot, using this command
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            all = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Nedzuno support commands guide!")
                .setDescription(`
                \`/avatar\` - you can type /avatar, and choose user if you want. If you don't select a user, then your avatar, if you will select user - the command will display user's avatar \n
                \`/dm\` - you can type /dm and choose user + message. Then command send this message directly to user \n
                \`/bye\` - you can kick choosen user with this coomand if you have permissions to do that \n
                \`/clear\` - you can clear choosen amount of messages if you have permissions to do that \n
                \`/mute\` - you can mute choosen user for choosen time in minutes if you have permissions to do that \n 
                \`/unmute\` - you can unmute choosen user if you have permissions to do that \n
                \`/job\` - you can register your user in database. Without it economic won't work. First you can only select 3 jobs: Psychologist, Builder, Student. You must earn coins and buy higher jobs with higher salary, and then you can made your own role! \n
                \`/work\` - you can earn coins with it. You can use this command only 1 time in hour \n
                \`/worktime\` - you can check, how much time you need to wait before using \`/work\` command \n
                \`/avaible\` - you can check avaible jobs for you \n
                \`/balance\` - you can check your balance (how much coins do u have) \n
                \`/give\` - you can give some coins to some user \n
                \`/ownrole\` - you can create your own role, with your own name, and with your own color! You need \`Programmer\` or \`Engineer\` job to use it, also you need 5000 coins. You can use this command only one time \n
                \`/ball\` - you can ask question and bot will answer you \n
                \`/say\` - you can send some message by bot \n
                \`/who\` - you can ask question, and it will answer you. For example: /who is my mom?, answer: @random_member is my mom \n
                \`/setspam\` - made current channel "spam channel" (without it you cant use other spam commands) \n
                \`/ping\` - ping some user with choosen amount of times \n
                \`/spam\` - spam entered message choosen amount of times \n
                \`/help\` - you already use it! \n
                \`/letter\` - you can send letter to a bot developer (me) \n
                \`/update\` - you can ask me to update bot, using this command
                `)
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            switch(category) {
                case "general":
                    member.send({ embeds: [general]});
                    break;
                case "moderation":
                    member.send({ embeds: [moderation]});
                    break;
                case "economic":
                    member.send({ embeds: [economic]});
                    break;
                case "fun":
                    member.send({ embeds: [fun]});
                    break;
                case "spam":
                    member.send({ embeds: [spam]});
                    break;
                case "support":
                    member.send({ embeds: [support]});
                    break;
                case "all":
                    member.send({ embeds: [all]});
                    break;
            }
        }
    } catch(err) {
        console.error(err);
    }
}