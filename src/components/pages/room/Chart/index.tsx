import { useState, useEffect } from 'react'
import { QueueCtrl } from '../../../../types/room/queue-ctrl'
import { Chart } from 'react-google-charts'
import { Card, CardContent, Typography } from '@mui/material'

type Props = {
    queue?: QueueCtrl
}

const RoomChart = ({ queue }: Props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const votesPercent = [['Card', 'Qntd']] as any

        queue?.story?.storyParticipants.forEach((vote: any) => {
            const voteIndex = votesPercent
                .findIndex((votePercent: any) => votePercent[0] === vote.roomCard.card.value)

            if(voteIndex > 0)
                votesPercent[voteIndex][1] = Number(votesPercent[voteIndex][1])+1
            else
                votesPercent.push([vote.roomCard.card.value, 1])
        })

        setData(votesPercent)
    }, [queue])

    return (
        <Card>
            <CardContent>
                <Typography align='center' variant='h5'>
                    Voting Results
                </Typography>
                <Chart
                    chartType='PieChart'
                    data={data}
                    options={{
                        backgroundColor: 'transparent',
                        is3D: true,
                        legend: {
                            textStyle: {
                                color: 'white'
                            },
                            position: 'right',
                            alignment: 'center'
                        },
                        fontName: 'Roboto',
                        fontSize: 20
                    }}
                    width='100%'
                    height='340px'
                />
            </CardContent>
        </Card>
    )
}

export default RoomChart