import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import graph from './../imgs/graph.png';
import sort from './../imgs/sort.png';

const Home = () => {
    return (
    <>
        <Card className="home-card">
        <CardMedia
            component="img"
            image={sort}
            alt="sorting algorithms"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Sorting Algorithms
            </Typography>
            <Typography variant="body2" color="text.secondary">
            A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements.  
            The comparison operator is used to decide the new order of elements in the respective data structure.
            </Typography>
            <Typography variant="body2" color="text.secondary">
            The run times vary across algorithms and are measured using Big-O notation. 
            Algorithms such as Merge Sort or Quick Sort have an average time complexity of O(nlog(n)) whereas Bubble Sort, Selection Sort and Insertion Sort have an average time complexity of O(n<sup>2</sup>).
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={'/sorts'}>
                <Button size="small">View Algorithms</Button>
            </Link>
        </CardActions>
        </Card>
        <Card className="home-card">
        <CardMedia
            component="img"
            image={graph}
            alt="sorting algorithms"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Graphing Algorithms
            </Typography>
            <Typography variant="body2" color="text.secondary">
            A graph is an abstract notation used to represent the connection between pairs of objects. A graph consists of vertices (also know as nodes) and edges.
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={'/graphs'}>
                <Button size="small">View Algorithms</Button>
            </Link>
        </CardActions>
        </Card>
    </>
    )
}

export default Home;




