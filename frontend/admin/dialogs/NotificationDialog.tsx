import React from "react";
import {Dialog, Slide, Grid, Typography, TextField, Button} from "@material-ui/core";
import {ModalHeader} from "../../common-component/ModalHeader";
import {X} from "react-feather";

export function NotificationDialog (){
    return <Dialog
        fullWidth
        TransitionComponent={Slide}
        maxWidth="xs"
        open={false}
        disableBackdropClick
        disableEscapeKeyDown
    >

        <ModalHeader className="px-3 py-2">
            <Grid item xs>
                <Typography variant="h6">Add Notification</Typography>
            </Grid>
            {
                <a style={{cursor: "pointer"}}>
                    <X/>
                </a>
            }
        </ModalHeader>
        <Grid container direction="column" wrap="nowrap" className="p-3">
            <Grid>
                <TextField margin="dense" required fullWidth size="small" label="Title" color="primary" variant="outlined" />
            </Grid>

            <Grid>
                <TextField margin="dense" multiline minRows={4} required fullWidth size="small" label="Push Notification Content" color="primary" variant="outlined" />
            </Grid>
            <Grid>
                <TextField margin="dense" required fullWidth size="small" label="Image" color="primary" variant="outlined" />
            </Grid>
        </Grid>
        <Grid container className="px-3 pb-3 justify-content-end">
            <Button size="small" className="text-white" color="primary" variant="contained">Submit</Button>
        </Grid>
    </Dialog>;
}
