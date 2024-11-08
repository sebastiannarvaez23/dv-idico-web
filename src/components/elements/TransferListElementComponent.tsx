import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

interface TransferListElementComponentProps {
    left: ListItem[],
    right: ListItem[],
    leftFinal: ListItem[],
    rightFinal: ListItem[],
    setLeft: (param: ListItem[]) => void,
    setRight: (param: ListItem[]) => void,
    setLeftFinal: (param: ListItem[]) => void,
    setRightFinal: (param: ListItem[]) => void,
}

function not(a: readonly ListItem[], b: readonly ListItem[]) {
    return a.filter((value) => !b.some((item) => item.id === value.id));
}

function intersection(a: readonly ListItem[], b: readonly ListItem[]) {
    return a.filter((value) => b.some((item) => item.id === value.id));
}

const TransferListElementComponent = ({
    left,
    right,
    setLeft,
    setRight,
    setLeftFinal,
    setRightFinal }: TransferListElementComponentProps) => {
    const [checked, setChecked] = React.useState<readonly ListItem[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (item: ListItem) => () => {
        const currentIndex = checked.findIndex((checkedItem) => checkedItem.id === item.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    React.useEffect(() => {
        const initialAssigned = left.filter(item => item.status === 'A');
        const initialUnassigned = right.filter(item => item.status === 'P');

        const currentAssigned = left;
        const currentUnassigned = right;

        const toRemove = initialUnassigned.filter(initItem =>
            currentAssigned.some(currentItem => currentItem.id === initItem.id)
        );

        const toAdd = initialAssigned.filter(initItem =>
            currentUnassigned.some(currentItem => currentItem.id === initItem.id)
        );

        setLeftFinal(toRemove);
        setRightFinal(toAdd);
    }, [left, right]);

    const customList = (items: readonly ListItem[], title: string) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Typography>{title}</Typography>
            <List dense component="div" role="list">
                {items.map((item: ListItem) => {
                    const labelId = `transfer-list-item-${item.id}-label`;

                    return (
                        <ListItemButton
                            key={item.id}
                            role="listitem"
                            onClick={handleToggle(item)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.some((checkedItem) => checkedItem.id === item.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.value} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid item>{customList(left, "libres")}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right, "asignados")}</Grid>
        </Grid>
    );
}

export default TransferListElementComponent;