import React from "react";
import {Dialog, Slide, Grid, Typography, TextField, Button} from "@material-ui/core";
import {ModalHeader} from "../../common-component/ModalHeader";
import {X} from "react-feather";
import {Autocomplete} from "@material-ui/lab";

export function ProductVariationDialog (){
    const top100Films = [
        {
            title: "The Shawshank Redemption",
            year: 1994
        },
        {
            title: "The Godfather",
            year: 1972
        }
    ];

    return <Dialog
        fullWidth
        TransitionComponent={Slide}
        maxWidth="md"
        open={false}
        disableBackdropClick
        disableEscapeKeyDown
    >

        <ModalHeader className="px-3 py-2">
            <Grid item xs>
                <Typography variant="h6">Add Variation</Typography>
            </Grid>
            {
                <a style={{cursor: "pointer"}}>
                    <X/>
                </a>
            }
        </ModalHeader>
        <Grid container direction="column" wrap="nowrap" className="p-3">
            <Grid container spacing={1}>
                <Grid item xs>
                    <TextField margin="dense" placeholder="Name" required fullWidth size="small" label="Name" color="primary" variant="outlined" />
                </Grid>
                <Grid item xs>
                    <TextField required type="number" placeholder="Quantity" margin="dense" fullWidth size="small" label="Quantity" color="primary" variant="outlined"/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs>
                    <TextField required placeholder="Size" type="number" margin="dense" fullWidth size="small" label="Size" color="primary" variant="outlined"/>
                </Grid>
                <Grid item xs>
                    <Autocomplete
                        size="small"
                        freeSolo renderInput={
                            (params) => (
                                <TextField {...params} margin="dense" placeholder="Select Unit" variant="outlined"/>)
                        }
                        options={top100Films.map((option) => option.title)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs>
                    <TextField required type="number" placeholder="Market Price" margin="dense" fullWidth size="small" label="Market Price" color="primary" variant="outlined"/>
                </Grid>
                <Grid item xs>
                    <TextField required type="number" placeholder="Actual Price" margin="dense" fullWidth size="small" label="Actual Price" color="primary" variant="outlined"/>
                </Grid>
            </Grid>
        </Grid>

        <Grid container className="px-3 pb-3 justify-content-end">
            <Button size="small" className="text-white" color="primary" variant="contained">Submit</Button>
        </Grid>
    </Dialog>;
}
