/* eslint-disable */
import React from "react";
import {Dialog, Slide, Grid, Typography, TextField, Button,DialogContent,MenuItem,Paper,FormControlLabel,Checkbox,Divider,InputLabel} from "@material-ui/core";
import {ModalHeader} from "../../common-component/ModalHeader";
import {X} from "react-feather";

export function LoyalityDialog (){
    return <Dialog
        fullWidth
        TransitionComponent={Slide}
        maxWidth="md"
        open={false}
        disableBackdropClick
        disableEscapeKeyDown
    >

        <ModalHeader className="px-4 py-2">
            <Grid item xs>
                <Typography variant="h6">Add Loyality</Typography>
            </Grid>
            {
                <a style={{cursor: "pointer"}}>
                    <X/>
                </a>
            }
        </ModalHeader>
        <DialogContent>
             <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth  size="small" label="Name" color="primary" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth size="small" label="Total Points" color="primary" variant="outlined" />
            </Grid>
        </Grid>

                 <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth select size="small" label="Amount Type" color="primary" variant="outlined">
                      <MenuItem value="%">Choose Amount Type</MenuItem>
                    <MenuItem value="%">%</MenuItem>
                    <MenuItem value="flat">Flat</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth size="small" type="number" label="Amount" color="primary" variant="outlined" />
            </Grid>
        </Grid>

                <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth size="small" type="number" label="Minimum Order Amount" color="primary" variant="outlined"/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField margin="dense" required fullWidth size="small" label="Description" color="primary" variant="outlined" />
            </Grid>
        </Grid>
            <Grid container spacing={1} className="mt-2">
                <Grid item xs>
                    <TextField size="small" label="Image" fullWidth variant="outlined" color="primary"/>
                </Grid>
                <Grid item component={Paper} direction="column" xs={12} sm={6} lg={6} md={6}>
                    <Grid className="p-1 d-flex justify-content-between align-items-center">
                        <Typography variant="h6" className="font-weight-bold">Categories</Typography>
                        <FormControlLabel
                            control={<Checkbox color="primary"/>}
                            label="Mark All"
                        />
                    </Grid>
                    <Grid item xs>
                        <Divider/>
                    </Grid>
                    <Grid item xs className="p-2 d-flex justify-content-between align-items-center">
                        <InputLabel className="font-weight-bold">Fruits</InputLabel>
                        <Checkbox color="primary"/>
                    </Grid>
                    <Grid item xs className="p-2 d-flex justify-content-between align-items-center">
                        <InputLabel className="font-weight-bold">Vegetables</InputLabel>
                        <Checkbox color="primary"/>
                    </Grid>
                </Grid>
            </Grid>

        </DialogContent>

        <Grid container className="px-3 pb-3 mt-3 justify-content-end">
            <Button size="small" className="text-white" color="primary" variant="contained">Submit</Button>
        </Grid>
    </Dialog>;
}
