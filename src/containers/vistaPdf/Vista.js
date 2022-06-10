import React from 'react'

import { Chip, Grid, Typography } from '@material-ui/core';
import SCORE_CARD_1 from '../../assets/SCORE_CARD_1.pdf';
import SCORE_CARD_2 from '../../assets/SCORE_CARD_2.pdf';
import SCORE_CARD_3 from '../../assets/SCORE_CARD_3-4.pdf';


export default function Vista() {
    const [type, setType] = React.useState(SCORE_CARD_1);
    const cambiar = (i) => {
        setType(i)
    }
    return (
        <Grid container spacing={3} style={{padding:10}} >
            <Grid item xs={12} >
                <Typography variant="h4" color="initial" style={{ fontWeight: 'bold',textAlign:'center' }}>SCORE CARDS</Typography>
            </Grid>
            <Grid item xs={12}>
                <Chip label="Evento 1" onClick={() => cambiar(SCORE_CARD_1)} style={{marginRight:5}} />
                <Chip label="Evento 2"  onClick={() => cambiar(SCORE_CARD_2)} style={{marginRight:5}}  />
                <Chip label="Evento 3 - 4" onClick={() => cambiar(SCORE_CARD_3)} />
            </Grid>
            <Grid item xs={12}>
            <object data={type} type="application/pdf" style={{width:'100%',height:500}}>
                <embed src={type} type="application/pdf" />
            </object>
            </Grid>
        </Grid>

    )
}
