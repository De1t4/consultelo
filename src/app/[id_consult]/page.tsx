'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function page() {
	const { id_consult } = useParams()

	return (
		<div>
			<h1>{id_consult?.toString()}</h1>
		</div>
	)
}