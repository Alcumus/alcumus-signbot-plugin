import React from 'react'
import { hints, tabs } from 'dynamic/awe-library/utils'
import Box from '@material-ui/core/Box'
import { ColorPicker } from 'common/color-picker'

hints('boolean', () => ['signature'])

tabs((type, selected) => {
    return type === 'question' && selected.type === 'boolean' && selected.hints.signature
}, SignatureEditor)

function SignatureEditor({ target, save }) {
    const [strokeColor, setStrokeColor] = React.useState(target.strokeColor)

    return (
        <Box onBlur={handleBlur}>
            <Box mt={1}>
                <ColorPicker
                    label="StrokeColor"
                    variant="outlined"
                    value={strokeColor}
                    onChange={handleStrokeColorChange}
                    fullWidth
                />
            </Box>
        </Box>
    )

    function handleStrokeColorChange(event) {
        setStrokeColor(event.target.value)
    }

    function handleBlur() {
        target.strokeColor = strokeColor
        save()
    }
}

SignatureEditor.group = { name: 'Signature Options', priority: 2500 }
