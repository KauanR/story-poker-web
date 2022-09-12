import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import styles from './styles.module.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import { Room } from '../types/room'
import { useRouter } from 'next/router'
import DashboardForm from '../Form'
import { useState } from 'react'
import { FormValues } from '../types/form-values'

type Props = {
    room: Room
    index: number
    editRoom: (room: Room, index: number) => void
    deleteRoom: (index: number) => void
}

const DashboardItem = ({ room, index, editRoom, deleteRoom }: Props) => {

    const router = useRouter()

    const [dialogCtrl, setDialogCtrl] = useState<{type: string, flag: boolean}>({type: '', flag: false})
    const openDialog = (type: string) => setDialogCtrl({type, flag: true})
    const closeDialog = () => setDialogCtrl({...dialogCtrl, flag: false})

    const editRoomHandler = (values: FormValues) => {
        const {name, type, ...roomAttr} = room
        editRoom({ ...values, ...roomAttr }, index)
        closeDialog()
    }

    const deleteRoomHandler = () => {
        deleteRoom(index)
        closeDialog()
    }

    return (
        <>
            <TableRow
                sx={{'&:last-child td, &:last-child th': {
                    border: 0
                }}}
            >
                <TableCell>
                    { room.name }
                </TableCell>

                <TableCell align='center'>
                    { room.type }
                </TableCell>

                <TableCell align='center'>
                    { room.estimatesQty }
                </TableCell>

                <TableCell align='center'>
                    { room.lastUsed || '...' }
                </TableCell>
                
                <TableCell align='right'>
                    <div className={styles.actions}>
                        <Tooltip
                            title='Play'
                            onClick={() => router.push(`/room/${room.id}`)}
                        >
                            <IconButton>
                                <PlayCircleFilledIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit' onClick={() => openDialog('edit')}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete' onClick={() => openDialog('delete')}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </TableCell>
            </TableRow>

            { dialogCtrl.flag && dialogCtrl.type === 'edit' && (
                <DashboardForm
                    initialValues={{
                        name: room.name,
                        type: room.type
                    }}
                    onClose={closeDialog}
                    onSubmit={editRoomHandler}
                    open={dialogCtrl.flag}
                    title='Edit Room'
                    buttonText='Edit'
                />
            )}

            { dialogCtrl.flag && dialogCtrl.type === 'delete' && (
                <Dialog
                    open={dialogCtrl.flag}
                    onClose={closeDialog}
                >
                    <DialogTitle>Delete room</DialogTitle>
                    <DialogContent>
                        <DialogContentText textAlign='center'>
                            Are you sure you want to delete this room?
                        </DialogContentText>
                        <DialogContentText textAlign='center'>
                            All related data will be permanently deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant='outlined'
                            type='button'
                            onClick={closeDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={deleteRoomHandler}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default DashboardItem
