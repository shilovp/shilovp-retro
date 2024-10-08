import { Router } from "next/router";

const About: React.FC<{}> = () => {

    const openSocial = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="p-2 border border-black bg-white select-text">
            <h1>I am Pavel</h1>
            <p className="text-sm mt-4">
                I am enthusiastic IT specialist working in international Fintech company.
                I am constantly evolving my skills.
                Here you see OS-like fun project build with NextJS.
                I was born in 90th - that is why it looks retro.
            </p>
            <p className="text-sm mt-2">
                Please, play around.
            </p>
            <p className="text-sm mt-2">
                I am always open for collaboration with interesting people, so contact me if you one of them.
            </p>
            <p className="text-sm mt-2">
                Lets create something <span className="text-red-600">awesome</span> together!
            </p>
            <p className="text-sm mt-2">
                For business inqueries contact me on <a className="text-blue-600" href="mailto:pavel.shilov@protonmail.com">pavel.shilov@protonmail.com</a>
            </p>
            <p className="text-sm mt-2 ml-2">Links:</p>
            <div className="mt-2 flex gap-4">
                <div className="flex flex-col cursor-pointer" onClick={() => openSocial('https://t.me/severus256')}>
                    <img src="../../tg.png" alt="Telegram" className="ml-2" width={30} />
                    <a style={{ fontSize: 10 }}>Telegram</a>
                </div>
                <div className="flex flex-col cursor-pointer" onClick={() => openSocial('https://www.linkedin.com/in/severus256/')}>
                    <img src="../../ldin.png" alt="LinkedIn" className="ml-2" width={30} />
                    <p style={{ fontSize: 10 }}>LinkedIn</p>
                </div>
                <div className="flex flex-col cursor-pointer" onClick={() => openSocial('https://discordapp.com/users/severus256')}>
                    <img src="../../dcd.png" alt="Discord" className="ml-2" width={30} />
                    <p className="px-0.5" style={{ fontSize: 10 }}>Discord</p>
                </div>
            </div>
        </div>
    );
}

export default About;