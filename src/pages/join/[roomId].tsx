import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Join from '../../components/pages/join'
import useAuthRedirect from '../../hooks/useAuthRedirect'

const JoinPage: NextPage = () => {
    const router = useRouter()
    const { roomId, title } = router.query

    return <Join roomId={roomId} title={title} />
}

export default JoinPage