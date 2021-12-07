import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({ info }) => {

    return info === null ? null :
        (
            <Alert className="mt-4" variant={info.type}>{info.message}</Alert>
        )
}

export default AlertMessage