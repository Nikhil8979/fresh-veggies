import React, {useState} from "react";
import {Grid, Paper, Typography, TextField, InputLabel, FormControlLabel, RadioGroup, Radio, IconButton, Button} from "@material-ui/core";
import {ReactStateDeclaration} from "@uirouter/react";
import {Autocomplete} from "@material-ui/lab";
import {Add, Delete} from "@material-ui/icons";

export function AddProducts (){
    const [abouts, setAbouts] = useState([{
        key: "",
        value: ""
    }]);

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

    return <Grid className="p-4">
        <Grid container>
            <Grid item xs>
                <Typography variant="h5" className="font-weight-normal">Add Product</Typography>
            </Grid>
        </Grid>
        <Grid component={Paper} className="my-3 p-3">
            <Grid container spacing={1}>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Name</InputLabel>
                    <TextField placeholder="Name" size="small" fullWidth required variant="outlined" color="primary"/>
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Category</InputLabel>
                    <Autocomplete
                        size="small"
                        freeSolo renderInput={
                            (params) => (
                                <TextField {...params} placeholder="Select Category" variant="outlined"/>)
                        }
                        options={top100Films.map((option) => option.title)}
                    />
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Sub Category</InputLabel>
                    <Autocomplete
                        size="small"
                        freeSolo renderInput={
                            (params) => (
                                <TextField {...params} placeholder="Select SubCategory" variant="outlined"/>)
                        }
                        options={top100Films.map((option) => option.title)}
                    />
                </Grid>
            </Grid>
            <Grid container className="mt-2" spacing={1}>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Market Price</InputLabel>
                    <TextField type="number" placeholder="Market Price" variant="outlined" size="small" fullWidth color="primary"/>
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Discount (Rs.)</InputLabel>
                    <TextField type="number" placeholder="Discount" variant="outlined" size="small" fullWidth color="primary"/>
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Selling Price</InputLabel>
                    <TextField type="number" placeholder="Selling Price" variant="outlined" size="small" fullWidth color="primary"/>
                </Grid>
            </Grid>
            <Grid container className="mt-2" spacing={1}>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Size</InputLabel>
                    <TextField type="number" placeholder="Size" variant="outlined" size="small" fullWidth color="primary"/>
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Unit</InputLabel>
                    <Autocomplete
                        size="small"
                        freeSolo renderInput={
                            (params) => (
                                <TextField {...params} placeholder="Select Unit" variant="outlined"/>)
                        }
                        options={top100Films.map((option) => option.title)}
                    />
                </Grid>
                <Grid item xs>
                    <InputLabel className="text-dark" required>Qty</InputLabel>
                    <TextField type="number" placeholder="Qty" variant="outlined" size="small" fullWidth color="primary"/>
                </Grid>
            </Grid>
            <Grid container className="mt-2" spacing={1}>
                <Grid item xs={6} md={4} lg={4}>
                    <InputLabel className="text-dark" required>Brand</InputLabel>
                    <Autocomplete
                        size="small"
                        freeSolo renderInput={
                            (params) => (
                                <TextField {...params} placeholder="Select Brand" variant="outlined"/>)
                        }
                        options={top100Films.map((option) => option.title)}
                    />
                </Grid>
                <Grid item xs={6} md={4} lg={4}>

                    <InputLabel className="text-dark" required>Visibility</InputLabel>
                    <RadioGroup >
                        <Grid className="d-flex align-items-center">
                            <FormControlLabel value="hidden" control={<Radio color="primary"/>} label="Hidden"/>
                            <FormControlLabel value="visible" control={<Radio color="primary"/>} label="Visible"/>
                        </Grid>
                    </RadioGroup>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs>
                    <Typography variant="h6">About Product</Typography>
                </Grid>

                {
                    abouts.map((about, index) => <Grid container spacing={1} key={index} className="pt-1">
                        <Grid item xs={6} md={4} lg={4}>
                            <InputLabel className="text-dark">Key</InputLabel>
                            <TextField placeholder="Key" fullWidth color="primary" variant="outlined" size="small"/>
                        </Grid>
                        <Grid item xs={6} md={4} lg={4}>
                            <InputLabel className="text-dark">Value</InputLabel>
                            <div className="d-flex ">
                                <TextField placeholder="Value" fullWidth color="primary" variant="outlined" size="small"/>
                                {
                                    index === 0 &&    <IconButton
                                        onClick={
                                            () => setAbouts(prev => {
                                                return [...prev, {
                                                    key: "",
                                                    value: ""
                                                }];
                                            })
                                        } className="ml-2" color="primary" size="small"
                                    >
                                        <Add/>
                                    </IconButton>
                                }
                                {
                                    index !== 0 && <IconButton
                                        onClick={() => setAbouts(prev => prev.filter((s, i) => i !== index))}
                                        className="ml-2" color="primary" size="small"
                                    >
                                        <Delete style={{color: "red"}}/>
                                    </IconButton>
                                }

                            </div>
                        </Grid>
                    </Grid>)
                }

                <Grid item xs className="pt-3">
                    <InputLabel className="text-dark" required>Product Type</InputLabel>
                </Grid>
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <RadioGroup >
                            <Grid className="d-flex align-items-center">
                                <FormControlLabel value="new_arrival" control={<Radio color="primary"/>} label="New Arrival"/>
                                <FormControlLabel value="featured" control={<Radio color="primary"/>} label="Featured"/>
                                <FormControlLabel value="trending" control={<Radio color="primary"/>} label="Trending"/>
                            </Grid>
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs className="d-flex justify-content-end">
                        <Button variant="contained" size="medium" className="text-white" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}

export const states: ReactStateDeclaration[] = [
    {
        name: "addProduct",
        url: "/add-product",
        component: AddProducts
    }
];
