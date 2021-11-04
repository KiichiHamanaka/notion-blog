const Page = (page) => {
    console.log(page)
    return (
        <div>
            {page.page.post}
            <a>{page.page.id}</a>
        </div>
    )
}
export default Page