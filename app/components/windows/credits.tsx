const Credits: React.FC<{}> = () => {

    return (
        <div className="p-2 border border-black bg-white select-text">
            <h2>Credits</h2>
            <ul className="list-disc p-4 text-sm">
                <li>React based Framework - <a className="text-blue-700" href="https://nextjs.org/">NextJS</a></li>
                <li>For the design - <a className="text-blue-700" href="https://tailwindcss.com/">Tailwind CSS</a></li>
                <li>Hosting by - <a className="text-blue-700" href="https://vercel.com/">Vercel</a></li>
                <li>Music by -  <a className="text-blue-700" href="https://en.wikipedia.org/wiki/Koji_Kondo">Koji Kondo</a></li>
                <li>Icons by - <a className="text-blue-700" href="https://www.freepik.com/">Freepik</a></li>
            </ul>
            <p className="text-xs">
                Thank you for making this project possible.
            </p>
        </div>
    );
}

export default Credits;