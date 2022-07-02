import * as React from "react"
import Link from "next/link"

export default React.forwardRef(({ to, ...props }, ref) => {
    return (
        <Link href={to} scroll={false} passHref>
            <a {...props} ref={ref} />
        </Link>
    )
})
