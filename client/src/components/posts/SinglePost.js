import Badge from 'react-bootstrap/Badge'
import ActionButton from './ActionButton'


const SinglePost = ({ post: { _id, status, title, description, url } }) => (
    <>
        <div className={
            status === 'LEARNED'
                ? 'border-success card mb-3'
                : status === 'LEARNING'
                    ? 'border-warning card mb-3'
                    : 'border-dark card mb-3'
        }>
            <div className={
                status === 'LEARNED'
                    ? 'card-header text-white text-center bg-success'
                    : status === 'LEARNING'
                        ? 'card-header text-white text-center bg-warning'
                        : 'card-header text-white text-center bg-dark'
            }>
                {title}
            </div>
            <div className="card-body">
                <p className="card-text">{description}</p>
                <Badge pill className={
                    status === 'LEARNED'
                        ? 'card-title text-white text-center bg-success'
                        : status === 'LEARNING'
                            ? 'card-title text-white text-center bg-warning '
                            : 'card-title text-white text-center bg-dark'
                }
                >
                    {status}
                </Badge>
            </div>
            <div 
                className="text-center card-header"
                style={{
                    backgroundColor: '#e6e2eb',
                    borderColor: 'none'
                }}>
                <ActionButton url={url} _id={_id}></ActionButton>
            </div>
        </div>

    </>
)

export default SinglePost