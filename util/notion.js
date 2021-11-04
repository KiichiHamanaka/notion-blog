import { Client } from '@notionhq/client'

const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_TOKEN
})

export const getDatabase = async () => {
    const response = await notion.databases.query({
        database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
        filter: {
            or: [
                {
                    property: 'Published',
                    checkbox: {
                        equals: true,
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'Date',
                direction: 'descending',
            },
        ],
    });
    console.log(response)
    return response.results
}
