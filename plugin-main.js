import React from 'react'

import { launcherApps } from 'common/launcher-apps'
import { MdEdit } from 'react-icons/md'
import { menuItems } from 'common/menu'
import { navigate, routes } from 'common/routing'
import { StandardPage } from 'framework/StandardPage'

import Box from '@material-ui/core/Box'
import { Signature } from './signature'

function Layout() {
    return <StandardPage background={'#009fda'} color="white" height={56} title={`SignBot`} />
}

const MockFormWithSignature = () => {
    const onSave = (...params) => {
        // eslint-disable-next-line no-console
        console.log({ params })
    }
    // mock initialising from already stored data
    // let image =
    //     'data:image/png;base64,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'
    let image
    return (
        <Box alignItems="center" justifyContent="center" ml={'auto'} mr={'auto'} width="80%" mt={4}>
            <Signature onSaveCB={onSave} image={image} />
        </Box>
    )
}

menuItems(() => ({
    signbot: {
        title: 'SignBot',
        icon: <MdEdit />,
        isActive: '/signbot',
        click(hide) {
            navigate('/signbot')
            hide()
        },
    },
}))

launcherApps((items) => {
    items.push({
        id: 'canvas.current',
        icon: <MdEdit />,
        label: 'SignBot',
        URI: '/signbot',
    })
})

routes(function () {
    return [
        {
            path: '/signbot',
            title: 'signbot',
            secure: false,
            parts: {
                main: Layout,
                content: MockFormWithSignature,
            },
        },
    ]
})
