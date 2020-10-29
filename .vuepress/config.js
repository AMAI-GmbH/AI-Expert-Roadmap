const container = require('markdown-it-container');
const fs = require('fs');
module.exports = {
    title: 'AI Expert Roadmap',
    description: 'The i.am.ai Experts Roadmap',
    dest: 'public/roadmap',
    base: '/roadmap/',
    themeConfig: {
        repo: 'https://github.com/AMAI-GmbH/AI-Expert-Roadmap',
        docsDir: '.',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Edit this page',
        sidebarDepth: 1,
        lastUpdated: 'Last Updated',
        search: false,
        sidebar: [
            ['/', 'Roadmap'],
            ['contributing.md', 'Contribution']
        ],
        nav: [
            { text: 'AI Use Cases', link: 'https://i.am.ai/usecases', target:'_self' },
            { text: 'AI Roadmap', link: '/' },
            { text: 'AI Newsletter', link: 'https://i.am.ai/newsletter', target:'_self' },
        ]
    },
    /* using this Google Analytics Plugin makes metomic's autoblock impossible
    
    plugins: {
        '@vuepress/plugin-google-analytics': {
            ga: 'UA-131730139-2'
          },
    }, */
    /*plugins: {
        '@vuepress/pwa': {xw
            serviceWorker: true,
            updatePopup: {
                message: "Updated documentation is available.",
                buttonText: "Refresh"
            }
        }
    },*/

    head: [
        ['script', {
            src: 'https://config.metomic.io/config.js?id=prj:c5c07948-cf96-4555-99ec-3a9bf5ae16ce', 
            crossorigin: 'anonymous',
            charset: 'utf-8'
        }],
        ['script', {
            src: 'https://consent-manager.metomic.io/embed.js', 
            crossorigin: 'anonymous',
            charset: 'utf-8'
        }],
        ['script', {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-131730139-2'
        }],
        ['script', {}, `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'UA-131730139-2');
        `],
        
        ['link', {
            rel: 'icon',
            href: `/logos/icon-512x512.png`
        }],
        ['link', {
            rel: 'manifest',
            href: '/manifest.json'
        }],
        ['meta', {
            name: 'theme-color',
            content: '#1f6286'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ['link', {
            rel: 'apple-touch-icon',
            href: `/logos/icon-152x152.png`
        }],
        ['meta', {
            name: 'msapplication-TileImage',
            content: '/logos/icon-144x144.png'
        }],
        ['meta', {
            name: 'msapplication-TileColor',
            content: '#ffffff'
        }],
        ["meta", {
            name: "Description",
            content: "Follow these roadmaps to become an Artificial Intelligence expert."
        }],
        ["meta", {
            property: "og:title",
            content: "AI Roadmap"
        }],
        ["meta", {
            property: "og:image",
            content: "https://i.am.ai/img/banner/i-am-ai-banner-roadmap.png"
        }],
        ["meta", {
            property: "og:description",
            content: "Follow these roadmaps to become an Artificial Intelligence expert."
        }],
        ["meta", {
            property: "og:url",
            content: "https://i.am.ai/roadmap"
        }],
        ["meta", {
            property: "og:type",
            content: "website"
        }],
        ["meta", {
            property: "og:site_name",
            content: "AI Roadmap"
        }],
        ['link', { 
            rel: "icon", 
            type: "image/png", 
            sizes: "32x32", 
            href: "/Favicon.png"
        }]
          
    ],
    extendMarkdown(md) {
        // SVG embedding for clickable images
        /*var defaultRender = md.renderer.rules.image;
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
            var token = tokens[idx],
                aIndex = token.attrIndex('src'),
                url = token.attrs[aIndex][1];
            if (url.startsWith("./") && url.endsWith(".svg")) {
                var svg = fs.readFileSync(url, 'utf8');
                svg = svg.replace(/<\?xml.+\?>|<!DOCTYPE.+>/g, '')
                // make links open in new window
                svg = svg.replace(/target=\"_blank\"/isg, "");
                svg = svg.replace(/(<a[^<>]*xlink:href=['\"]?http[^<>]+)>/isg, "$1 target=\"_blank\">");
                return svg;
            }
            return defaultRender(tokens, idx, options, env, self);
        }
*/
        md.use(container, 'example', {
            render: (tokens, idx) => tokens[idx].nesting === 1 ?
                `<Example title="${tokens[idx].info.trim().slice('upgrade'.length).trim()}">` : '</Example>'
        })
        md.use(container, 'youtube', {
            render: (tokens, idx) => tokens[idx].nesting === 1 ?
                `<Youtube>` : '</Youtube>'
        })

        const render = md.render;

        md.render = (...args) => {
            // original content
            var html = render.call(md, ...args);
            
            // Replace Github links to i.am.ai/roadmap in the roadmap
            html = html.replace(/<a[[\s]+([^>]+)>((?:.|\s)*?)<\/a>/g, function(match, p1, p2) {
                if(p1.startsWith('href="https://i.am.ai/roadmap#')) {
                    return p2;
                }
                return match
            });

            // SVG embedding for clickable images
            html = html.replace(/<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g, function(match, p1) {
                if(p1.startsWith("./images/") && p1.endsWith(".svg") && !p1.startsWith("./images/logos")) {
                    var svg = fs.readFileSync(p1, 'utf8');
                    svg = svg.replace(/<\?xml.+\?>|<!DOCTYPE.+>/g, '')
                    // make links open in new window
                    svg = svg.replace(/target=\"_blank\"/isg, "");
                    svg = svg.replace(/(<a[^<>]*xlink:href=['\"]?http[^<>]+)>/isg, "$1 target=\"_blank\">");
                    return svg;
                }
                return match
            });


//  <a href="https://i.am.ai/roadmap#introduction" target="_blank">

            return html
        };
    }/*,
    chainWebpack: config => {
        // Each loader in the chain applies transformations to the processed resource:
        config.module
          .rule('md')
          .test(/\.md$/)
          .use("string-replace-loader")
          .loader("string-replace-loader")
          .options({
            multiple: [{
                search: /\[(.+)\]\([^ ]+?( "(.+)")?\)/g,
                replace: (match, p1, offset, string, groups) => `${p1}`
              },
              {
                search: /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g,
                replace: (match, p1, offset, string, groups) => {
                    if (p1.startsWith("./") && p1.endsWith(".svg")) {
                        var svg = fs.readFileSync(p1, 'utf8');
                        svg = svg.replace(/<\?xml.+\?>|<!DOCTYPE.+>/g, '')
                        // make links open in new window
                        svg = svg.replace(/target=\"_blank\"/isg, "");
                        svg = svg.replace(/(<a[^<>]*xlink:href=['\"]?http[^<>]+)>/isg, "$1 target=\"_blank\">");
                        return svg;
                    }
                    return string
                }
              }
            ],
          }, )
          .end()
      },*/
    };