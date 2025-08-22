import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "./subpages/navbar"

const Profile = ({ storedUser }) => {
    const role = JSON.parse(localStorage.getItem("user") || "{}").role
    const [user, setUser] = useState(storedUser)
    const [editMode, setEditMode] = useState(false)

    const [form, setForm] = useState({
        fullname: user.fullname || "",
        email: user.email || "",
        role: user.role || "user",
        bio: user.bio || "",
        resume_file: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "resume_file") {
            setForm({ ...form, resume_file: files[0] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleUpdate = async () => {
        const formData = new FormData()
        Object.keys(form).forEach((key) => {
            if (form[key]) formData.append(key, form[key])
        })

        try {
            const res = await fetch(
                `http://localhost:8000/api/users/${user.user_id}/profile_setup/`,
                {
                    method: "POST",
                    body: formData,
                }
            )
            if (!res.ok) throw new Error("Failed to update profile")
            const updatedUser = await res.json()

            // update UI + localStorage
            setUser(updatedUser)
            localStorage.setItem("user", JSON.stringify(updatedUser))
            setEditMode(false)
        } catch (err) {
            console.error("Update failed", err)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="shadow-xl rounded-2xl border border-slate-200">
                <CardHeader className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-blue-500 text-white text-xl">
                            {user.fullname?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        {editMode ? (
                            <Input
                                name="fullname"
                                value={form.fullname}
                                onChange={handleChange}
                                className="font-bold text-xl"
                            />
                        ) : (
                            <CardTitle className="text-2xl font-bold text-slate-800">
                                {user.fullname}
                            </CardTitle>
                        )}
                        {editMode ? (
                            <Input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        ) : (
                            <p className="text-slate-500">{user.email}</p>
                        )}
                        <Badge className="mt-2 capitalize">{user.role}</Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Bio Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-slate-700">About Me</h2>
                        {editMode ? (
                            <Textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                className="mt-2"
                            />
                        ) : (
                            <p className="text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                                {user.bio || "No bio added yet."}
                            </p>
                        )}
                    </div>

                    {/* Resume Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-slate-700">Resume</h2>
                        {editMode ? (
                            <Input
                                name="resume_file"
                                type="file"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                            />
                        ) : user.resume_file ? (
                            <a
                                href={`http://localhost:8000/api/users/${user.user_id}/resume/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Resume
                            </a>
                        ) : (
                            <p className="text-slate-500">No resume uploaded</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {role === 'user' && (
                        <div className="flex gap-4">
                            {editMode ? (
                                <>
                                    <Button onClick={handleUpdate} className="w-1/2">
                                        Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setEditMode(false)}
                                        className="w-1/2"
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setEditMode(true)} className="w-1/2">
                                        Edit Profile
                                    </Button>
                                    <Link to={`/mock-interviews/user/${user.user_id}`} className="w-1/2">
                                        <Button className="w-full">
                                            My Mock Interviews
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile