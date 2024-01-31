const { program } = require('commander');
const notifier = require('node-notifier');
const path = require('path');

async function main() {

    program.option('-t, --title <title>', 'Title of the notification');
    program.option('-m, --message <message>', 'Message of the notification');

    program.action(
        async (options) => {
            notifier.notify({
                title: options.title,
                message: options.message,
                icon: path.join(__dirname, "icon.png")
            });
        }
    );

    await program.parseAsync(process.argv);

}

main()
    .then(
        () => {
            process.exit(0);
        }
    )
    .catch(
        (err) => {
            console.error(err);
            process.exit(1);
        }
    );