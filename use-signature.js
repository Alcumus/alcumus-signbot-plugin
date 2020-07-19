import React from 'react'

import { useWindowSize } from 'common/use-event'

export const useSignature = ({
    canvas,
    image,
    lineCap = 'round',
    lineJoin = 'round',
    lineWidth = 4,
    onSaveCB = () => {},
    strokeStyle = 'black',
}) => {
    const [resetOrientation, setResetOrientation] = React.useState(false)
    const [context, setContext] = React.useState(null)
    const [saved, setSaved] = React.useState(image)
    const [editing, setEditing] = React.useState(saved ? false : true)
    const { width, height } = useWindowSize()

    let isBlank = true
    let isDrawing = false
    let whatBlankLooksLike
    let x = 0
    let y = 0
    let boundingRect
    let scaleX
    let scaleY

    const initialiseCanvasStyles = () => {
        context.strokeStyle = strokeStyle
        context.lineJoin = lineJoin
        context.lineCap = lineCap
        context.lineWidth = lineWidth
    }

    const reset = () => {
        setResetOrientation(!resetOrientation)
    }

    const setCanvasHeight = () => {
        canvas.current.width = canvas.current.parentNode.clientWidth
        canvas.current.height = canvas.current.parentNode.clientHeight
        boundingRect = canvas.current.getBoundingClientRect()
        scaleX = canvas.current.width / boundingRect.width
        scaleY = canvas.current.height / boundingRect.height
    }

    React.useEffect(() => {
        if (!context) return
        const getXy = ({ changedTouches = [{}], offsetX, offsetY }) => {
            const [{ clientX, clientY }] = changedTouches

            // Deal with offset window location on mobile for context.
            let ix = (clientX - boundingRect.left) * scaleX
            let iy = (clientY - boundingRect.top) * scaleY

            return [Math.round(ix || offsetX), Math.round(iy || offsetY)]
        }
        const handleDrawEnd = (e) => {
            e.preventDefault()
            isDrawing = false
        }

        const handleInBounds = (e) => {
            if (e.which) {
                handleDrawInit(e)
            }
        }

        const handleDrawInit = (e) => {
            e.preventDefault()
            isDrawing = true
            ;[x, y] = getXy(e)
        }

        const handleDraw = (e) => {
            e.preventDefault()

            if (!isDrawing) return
            context.beginPath()
            context.moveTo(x, y)
            ;[x, y] = getXy(e)
            context.lineTo(x, y)
            context.stroke()
        }
        window.addEventListener('orientationchange', reset)
        context.canvas.addEventListener('mousedown', handleDrawInit)
        context.canvas.addEventListener('mousemove', handleDraw)
        context.canvas.addEventListener('mouseout', handleDrawEnd)
        context.canvas.addEventListener('mouseenter', handleInBounds)
        context.canvas.addEventListener('mouseup', handleDrawEnd)
        context.canvas.addEventListener('touchend', handleDrawEnd)
        context.canvas.addEventListener('touchmove', handleDraw)
        context.canvas.addEventListener('touchstart', handleDrawInit)

        setCanvasHeight()
        initialiseCanvasStyles()

        whatBlankLooksLike = context.canvas.toDataURL()

        return () => {
            window.removeEventListener('orientationchange', reset)
            context.canvas.removeEventListener('mousedown', handleDrawInit)
            context.canvas.removeEventListener('mousemove', handleDraw)
            context.canvas.removeEventListener('mouseout', handleDrawEnd)
            context.canvas.removeEventListener('mouseup', handleDrawEnd)
            context.canvas.removeEventListener('touchend', handleDrawEnd)
            context.canvas.removeEventListener('touchmove', handleDraw)
            context.canvas.removeEventListener('touchstart', handleDrawInit)
        }
    }, [context, reset])

    React.useEffect(() => {
        if (!context) return
        const originalImage = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
        setCanvasHeight()
        initialiseCanvasStyles()
        whatBlankLooksLike = context.canvas.toDataURL()
        if (originalImage !== whatBlankLooksLike) {
            context.putImageData(originalImage, 0, 0)
        }
    }, [width, height])

    React.useEffect(() => {
        if (!canvas.current) return
        if (!editing) return
        const initialiseContext = canvas.current.getContext('2d')

        setContext(initialiseContext)
    }, [canvas.current, editing])

    const onSave = () => {
        if (!context) {
            console.error('Something went wrong, please refresh')
            return
        }
        const test = context.canvas.toDataURL('image/png')
        if (context.canvas.toDataURL() === whatBlankLooksLike) {
            isBlank = true
        } else {
            isBlank = false
        }
        setSaved(test)
        setEditing(false)
        setContext(null)
        onSaveCB({ isBlank, signatureImage: test })
    }

    const onClear = () => {
        if (!context) return
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        whatBlankLooksLike = context.canvas.toDataURL()
        isBlank = true
        setSaved(null)
    }

    const onEdit = () => {
        setSaved(null)
        setEditing(true)
        isBlank = true
    }

    const isReady = () => context !== null

    return { isBlank, isReady, context, onSave, onClear, onEdit, saved }
}
