export default function Header(){
    return(
        <header className="sticky top-0">
    <nav class="bg-inherit border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a  class="flex items-center">
                <lord-icon trigger="hover" src="/src/assets/logo.json"></lord-icon>
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white mx-1">TaskWiz</span>
            </a>
            <span>
                <img className="w-10 h-10 rounded-3xl inline mx-2" src="/src/assets/avatar.jpg" alt="Default avatar"></img>
                <a href="https://github.com/Diptoprovo" className="text-white">Github</a>
            </span>
            
        </div>
    </nav>
</header>
    )
}