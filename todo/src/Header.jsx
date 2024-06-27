export default function Header(){
    return(
        <header className="">
    <nav class="bg-inherit border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a  class="flex items-center">
            <lord-icon
                            src="https://cdn.lordicon.com/pcllgpqm.json"
                            trigger="hover"
                            stroke="light"
                            >
                        </lord-icon>
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white mx-1">TaskWiz</span>
            </a>
            <span>
                <img className="w-10 h-10 rounded-3xl inline mx-2" src="https://avatars.githubusercontent.com/u/118748808?v=4" alt="Default avatar"></img>
                <a href="https://github.com/Diptoprovo" className="text-white hover:text-green-500 transition">Github</a>
            </span>
            
        </div>
    </nav>
</header>
    )
}