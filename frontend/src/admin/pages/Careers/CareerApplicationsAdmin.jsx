
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Search,
    RefreshCw,
    Eye,
    Trash2,
    Download,
    X,
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    GraduationCap,
    Briefcase,
    FileText,
    User,
    Filter,
    AlertCircle,
} from "lucide-react";

import { api } from "../../lib/apiClient";
import "./CareerApplicationsAdmin.css";

const STATUSES = ["New", "Reviewing", "Shortlisted", "Rejected"];

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const CareerApplicationsAdmin = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [updatingId, setUpdatingId] = useState("");
    const [deletingId, setDeletingId] = useState("");

    const fetchApplications = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.get("/api/content/careers/applications");
            setApplications(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Unable to load applications.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const filteredApplications = useMemo(() => {
        return applications.filter((application) => {
            const query = search.trim().toLowerCase();

            const matchesSearch =
                !query ||
                [
                    application.fullName,
                    application.email,
                    application.mobile,
                    application.designation,
                    application.city,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(query)
                    );

            const matchesStatus =
                statusFilter === "All" ||
                application.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [applications, search, statusFilter]);

    const counts = useMemo(() => ({
        total: applications.length,
        new: applications.filter((item) => item.status === "New").length,
        reviewing: applications.filter((item) => item.status === "Reviewing").length,
        shortlisted: applications.filter((item) => item.status === "Shortlisted").length,
        rejected: applications.filter((item) => item.status === "Rejected").length,
    }), [applications]);

    const updateStatus = async (application, status) => {
        const id = application._id;

        setUpdatingId(id);

        try {
            const updated = await api.patch(
                `/api/content/careers/applications/${id}/status`,
                {
                    status,
                    adminNotes: application.adminNotes || "",
                }
            );

            setApplications((previous) =>
                previous.map((item) =>
                    item._id === id ? { ...item, ...updated } : item
                )
            );

            setSelectedApplication((previous) =>
                previous?._id === id
                    ? { ...previous, ...updated }
                    : previous
            );
        } catch (err) {
            alert(err.message || "Unable to update application status.");
        } finally {
            setUpdatingId("");
        }
    };

    const deleteApplication = async (application) => {
        const confirmed = window.confirm(
            `Delete the application submitted by ${application.fullName}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeletingId(application._id);

        try {
            await api.del(
                `/api/content/careers/applications/${application._id}`
            );

            setApplications((previous) =>
                previous.filter((item) => item._id !== application._id)
            );

            if (selectedApplication?._id === application._id) {
                setSelectedApplication(null);
            }
        } catch (err) {
            alert(err.message || "Unable to delete application.");
        } finally {
            setDeletingId("");
        }
    };

    const getResumeUrl = (resume) => {
        if (!resume?.url) return "#";
        return api.apiUrl(resume.url);
    };

    return (
        <div className="career-applications-page">
            <div className="career-applications-header">
                <div>
                    <h1>Career Applications</h1>
                    <p>Review and manage candidates who applied for your open positions.</p>
                </div>

                <button
                    type="button"
                    className="career-refresh-btn"
                    onClick={fetchApplications}
                    disabled={loading}
                >
                    <RefreshCw size={16} className={loading ? "is-spinning" : ""} />
                    Refresh
                </button>
            </div>

            <div className="career-application-stats">
                <div className="career-stat-card">
                    <span>Total Applications</span>
                    <strong>{counts.total}</strong>
                </div>
                <div className="career-stat-card">
                    <span>New</span>
                    <strong>{counts.new}</strong>
                </div>
                <div className="career-stat-card">
                    <span>Reviewing</span>
                    <strong>{counts.reviewing}</strong>
                </div>
                <div className="career-stat-card">
                    <span>Shortlisted</span>
                    <strong>{counts.shortlisted}</strong>
                </div>
                <div className="career-stat-card">
                    <span>Rejected</span>
                    <strong>{counts.rejected}</strong>
                </div>
            </div>

            <div className="career-applications-toolbar">
                <div className="career-search-box">
                    <Search size={18} />
                    <input
                        type="search"
                        placeholder="Search name, email, role or city..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className="career-filter-box">
                    <Filter size={16} />
                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                    >
                        <option value="All">All statuses</option>
                        {STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="career-applications-error">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                    <button type="button" onClick={fetchApplications}>
                        Try again
                    </button>
                </div>
            )}

            <div className="career-applications-table-wrap">
                <table className="career-applications-table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Position</th>
                            <th>Experience</th>
                            <th>Applied on</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="career-table-message">
                                    <RefreshCw size={20} className="is-spinning" />
                                    Loading applications...
                                </td>
                            </tr>
                        ) : filteredApplications.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="career-table-message">
                                    <FileText size={24} />
                                    <strong>No applications found</strong>
                                    <span>
                                        {applications.length === 0
                                            ? "Submitted applications will appear here."
                                            : "Try changing your search or status filter."}
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            filteredApplications.map((application) => (
                                <tr key={application._id}>
                                    <td>
                                        <div className="career-applicant-cell">
                                            <div className="career-applicant-avatar">
                                                {(application.fullName || "A")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <strong>{application.fullName}</strong>
                                                <span>{application.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{application.designation || "—"}</td>
                                    <td>{application.experience || "—"}</td>
                                    <td>{formatDate(application.createdAt)}</td>

                                    <td>
                                        <span
                                            className={`career-status-badge ${(application.status || "New").toLowerCase()}`}
                                        >
                                            {application.status || "New"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="career-row-actions">
                                            <button
                                                type="button"
                                                title="View application"
                                                onClick={() => setSelectedApplication(application)}
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete application"
                                                className="delete"
                                                disabled={deletingId === application._id}
                                                onClick={() => deleteApplication(application)}
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="career-applications-footer">
                Showing {filteredApplications.length} of {applications.length} applications
            </div>

            {selectedApplication && (
                <div
                    className="career-detail-overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedApplication(null);
                        }
                    }}
                >
                    <div className="career-detail-modal">
                        <div className="career-detail-header">
                            <div>
                                <span>APPLICATION DETAILS</span>
                                <h2>{selectedApplication.fullName}</h2>
                                <p>{selectedApplication.designation}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedApplication(null)}
                                aria-label="Close details"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <div className="career-detail-body">
                            <section className="career-detail-section">
                                <h3><User size={17} /> Personal Information</h3>
                                <div className="career-detail-grid">
                                    <Detail label="Full name" value={selectedApplication.fullName} />
                                    <Detail label="Gender" value={selectedApplication.gender} />
                                    <Detail label="Email" value={selectedApplication.email} />
                                    <Detail label="Mobile" value={selectedApplication.mobile} />
                                    <Detail label="Date of birth" value={formatDate(selectedApplication.dob)} />
                                    <Detail label="City" value={selectedApplication.city} />
                                </div>
                            </section>

                            <section className="career-detail-section">
                                <h3><GraduationCap size={17} /> Education</h3>
                                <div className="career-detail-grid">
                                    <Detail label="Qualification" value={selectedApplication.qualification} />
                                    <Detail label="Branch / Specialization" value={selectedApplication.branch} />
                                    <Detail label="College" value={selectedApplication.college} />
                                    <Detail label="Passout year" value={selectedApplication.passoutYear} />
                                </div>
                            </section>

                            <section className="career-detail-section">
                                <h3><Briefcase size={17} /> Professional Details</h3>
                                <div className="career-detail-grid">
                                    <Detail label="Experience" value={selectedApplication.experience} />
                                    <Detail label="Company" value={selectedApplication.company} />
                                    <Detail label="Referral source" value={selectedApplication.source} />
                                    <Detail label="Other referral details" value={selectedApplication.otherSource} />
                                </div>

                                <Detail
                                    label="Skills"
                                    value={
                                        Array.isArray(selectedApplication.skills)
                                            ? selectedApplication.skills.join(", ")
                                            : selectedApplication.skills
                                    }
                                />

                                {selectedApplication.otherSkill && (
                                    <Detail label="Other skills" value={selectedApplication.otherSkill} />
                                )}

                                {selectedApplication.message && (
                                    <Detail label="Additional message" value={selectedApplication.message} />
                                )}
                            </section>

                            <section className="career-detail-section">
                                <h3><FileText size={17} /> Resume</h3>

                                {selectedApplication.resume?.length ? (
                                    <div className="career-resume-list">
                                        {selectedApplication.resume.map((resume, index) => (
                                            <a
                                                key={resume.filename || index}
                                                href={getResumeUrl(resume)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="career-resume-link"
                                            >
                                                <FileText size={18} />
                                                <span>{resume.originalName || `Resume ${index + 1}`}</span>
                                                <Download size={17} />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="career-no-resume">No resume attached.</p>
                                )}
                            </section>

                            <section className="career-detail-section">
                                <h3><CalendarDays size={17} /> Application Review</h3>

                                <div className="career-status-editor">
                                    <label htmlFor="career-status-select">Application status</label>
                                    <select
                                        id="career-status-select"
                                        value={selectedApplication.status || "New"}
                                        disabled={updatingId === selectedApplication._id}
                                        onChange={(event) =>
                                            updateStatus(selectedApplication, event.target.value)
                                        }
                                    >
                                        {STATUSES.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    {updatingId === selectedApplication._id && (
                                        <span>Updating...</span>
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="career-detail-footer">
                            <span>Applied on {formatDate(selectedApplication.createdAt)}</span>
                            <button
                                type="button"
                                onClick={() => setSelectedApplication(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="career-detail-item">
        <span>{label}</span>
        <strong>{value || "—"}</strong>
    </div>
);

export default CareerApplicationsAdmin;
