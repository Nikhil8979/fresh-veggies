import React, {useEffect, useState} from "react";
import {Dialog,
    Slide,
    Grid,
    Typography,
    TextField,
    Button,
    DialogProps,
    InputLabel,
    makeStyles} from "@material-ui/core";
import {ModalHeader} from "../../common-component/ModalHeader";
import {X} from "react-feather";
import {CloudUpload} from "@material-ui/icons";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import {CategoryType} from "../../../src/models/category";
import {unstable_batchedUpdates} from "react-dom";
import {generateFormData} from "../../helpers/common";
import {$crud} from "../../factories/CrudFactory";

type AddCategoryDialogProps = Partial<DialogProps>

const useStyles = makeStyles(() => ({
    uploadImage: {
        width: "100%",
        height: "150px",
        backgroundColor: "rgb(230, 230, 230)",
        borderRadius: "10px"
    }
}));

export function CategoryDialog (props: AddCategoryDialogProps){
    const {open, onClose, ...dialogProps} = props;
    const classes = useStyles({});
    const [params, setParams] = useState<Partial<CategoryType>>({});
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState<any>({});

    const setParam = (key: string, value: any) => unstable_batchedUpdates(() => {
        setParams(prev => {
            return {
                ...prev,
                [key]: value
            };
        });

        setErrors(prev => {
            return {
                ...prev,
                [key]: ""
            };
        });
    });

    const submitCategory = async () => {
        await $crud.post("create/web/category", generateFormData(params));
    };

    const cancel = (): void => {
        onClose(null, null);
    };

    useEffect(() => {
        console.log(params, "---params----------");
    }, [params]);

    return <Dialog
        fullWidth
        TransitionComponent={Slide}
        maxWidth="xs"
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        {...dialogProps}
    >

        <ModalHeader className="px-3 py-2">
            <Grid item xs>
                <Typography variant="h6">Add Category</Typography>
            </Grid>
            {
                <a onClick={cancel} style={{cursor: "pointer"}}>
                    <X/>
                </a>
            }
        </ModalHeader>
        <Grid container direction="column" wrap="nowrap" className="p-3">
            <Grid>
                <TextField
                    autoFocus={true}
                    margin="dense" error={!!errors?.name} helperText={errors?.name}
                    onChange={e => setParam("name", e.target.value)} required fullWidth size="small" label="Name"
                    color="primary"
                    variant="outlined"
                />
            </Grid>
            <Grid className="mt-2">
                <InputLabel className="text-dark font-weight-normal" required>Category Image</InputLabel>
                <Dropzone
                    onDropAccepted={image => setParam("image", image)}
                    onDragLeave={() => console.log("on drag leave")}
                    onDragEnter={() => console.log("on drag enter")}
                >
                    {
                        ({getRootProps, getInputProps}) => {
                            return <Grid {...getRootProps()}>
                                <div
                                    className={classNames("d-flex justify-content-center align-items-center text-center", classes.uploadImage)}
                                >
                                    <div>
                                        <Typography className="small text-center font-weight-bold">
                                            Drag and Drop files here or click to upload
                                        </Typography>
                                        <CloudUpload className="mt-2" fontSize="large"/>
                                    </div>
                                </div>

                                <input {...getInputProps()}/>
                            </Grid>;
                        }
                    }
                </Dropzone>
            </Grid>
        </Grid>
        <Grid container className="px-3 pb-3 justify-content-end">
            <Button
                size="small" className="text-white" color="primary" onClick={() => submitCategory()}
                variant="contained"
            >Submit</Button>
        </Grid>
    </Dialog>;
}
