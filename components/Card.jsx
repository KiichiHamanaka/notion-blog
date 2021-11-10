import dayjs from 'dayjs'
import Link from 'next/link'

const Card = ({title, link, tag, date}) => {
    const day = dayjs(date).format('YYYY-MM-DD')
    return (
        <div>
            <Link href={link}>
                <a>
                    <h3>{title}</h3>
                    {day}
                </a>
            </Link>
        </div>
    );
};

export default Card;
