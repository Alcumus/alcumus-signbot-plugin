import React from 'react'
import { Box } from '@material-ui/core'
import { plug } from 'common/widgets'
import { useQuestionContext } from 'dynamic/awe-library/runtime/contexts'

import { raise } from 'common/events'
import { Signature } from './signature'

plug('question.renderer.boolean', SignatureRenderer).replace(() => {
    const question = useQuestionContext()
    if (question && question.hints.signature) {
        return true
    } else {
        return false
    }
}).priority = -100


function SignatureRenderer({ question, instance, save }) {
    const extraImageDataKey = `${question.name}_signatureImage`

    const [value, setValue] = React.useState({
        isBlank: !instance[question.name],
        signatureImage: instance[extraImageDataKey],
    })

    const { signatureImage } = value

    function handleSave(payload) {
        const { isBlank, signatureImage } = payload
        instance[question.name] = !isBlank ? 'yes' : 'no'
        instance[extraImageDataKey] = signatureImage
        setValue(payload)
        save()
    }

    function handleBlur() {
        raise(`question.exit.${instance._id}`, question)
        save()
    }

    return (
        <Box width="100%" onBlur={handleBlur}>
            <Signature onSaveCB={handleSave} image={signatureImage} strokeStyle={question.strokeColor} />
        </Box>
    )
}
