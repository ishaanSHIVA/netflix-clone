import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    toolbar: {
        height: '70px',
        backgroundColor: 'pink'
    },
    content: {
        flexGrow: 1,
        padding:'2em'
    }
}))