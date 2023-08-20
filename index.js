const fs = require('fs');

const axios = require('axios');

axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

const { program } = require('commander');

program
    .argument('<url>', 'URL da aplicação a ser testada')
    .option('-d, --delay <ms>', 'Tempo de delay entre as requisições', 200)
    .option('-f, --file <path>', 'Arquivo da wordlist', 'wordlist.txt')
    .action(async (url, options) => {
        let delay = parseInt(options.delay);
        let file = options.file;

        if (url.substring(url.length - 1) == '/') {
            url = url.substring(0, url.length - 1);
        }

        try {
            new URL(url);
        } catch (error) {
            console.log('URL inválida.');
            return;
        }

        if (!fs.existsSync(file)) {
            console.log(`O arquivo "${file}" não existe.`);
            return;
        }

        async function sleep(time) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, time);
            });
        }

        let content = fs.readFileSync(file, { encoding: 'utf-8' });

        for (const path of content.split('\n')) {
            try {
                let response = await axios.options(`${url}${path}`);

                if (response.status == 200) {
                    const { allow } = response.headers;

                    for (const method of allow.split(',')) {
                        console.log(`${method.trim()} ${path}`);
                    }
                }
            } catch (error) {

            }

            if (delay > 0) {
                await sleep(delay);
            }
        }
    });

program.parse();