import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  inviteTeacherAsyncThunk,
  sentNotificationAsyncThunk,
} from "../../features/class/ClassSlice";
import { useRef } from "react";
import { useEffect } from "react";

const People = ({ ClassData }) => {
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "30px",
      marginBottom: "10px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
    },
    addButton: {
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "14px",
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    member: {
      display: "flex",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
      gap: "12px",
    },
    memberImage: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      objectFit: "cover",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    memberName: {
      fontSize: "16px",
      color: "#333",
    },
    noStudentsText: {
      marginLeft: "10px",
      color: "#888",
      marginTop: "10px",
      fontStyle: "italic",
    },
    addStudentsSection: {
      textAlign: "center",
      marginTop: "60px",
    },
    addStudentsImage: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    addStudentsText: {
      marginTop: "20px",
      fontSize: "17px",
      color: "#444",
    },
    inviteButton: {
      marginTop: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      fontSize: "15px",
      borderRadius: "6px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    },
    modalContainer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100vw",
      zIndex: 1050,
      backgroundColor: "#fff",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      borderTop: "1px solid #ccc",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      animation: "slideUp 0.3s ease-out",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "red",
    },
    linkInputContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    input: {
      flexGrow: 1,
      padding: "10px 40px 10px 10px", // Added padding for the copy icon
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
    },
    copyButton: {
      position: "absolute",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    cancelButton: {
      marginTop: "10px",
      background: "#dc3545",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      fontSize: "14px",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  const [shareBoxOpen, setShareBoxOPen] = useState(false);
  const dispatch = useDispatch();
  const [emailinput, setemailinput] = useState("");
  const [TeacherEmails, setTeacherEmails] = useState([]);
  const closeInviteTeacherModalRef = useRef(null);
  const handleShareBoxOpen = () => setShareBoxOPen(!shareBoxOpen);
  const user = useSelector((state) => state.auth.user);
  const inviteLink = `${import.meta.env.VITE_VIEW_BASE_URL}/invite-student/${
    ClassData.code
  }`;
  const shareText = `Hey! Join my class now 👇\n${inviteLink}`;
  const handleCopy = () => {
    toast.success("Link Coopied...");
    navigator.clipboard.writeText(inviteLink);
  };
  useEffect(() => {
    const storedEmails =
      JSON.parse(localStorage.getItem("Teacher_emails")) || [];
    setTeacherEmails(storedEmails);
  }, []);

  // ~~ Share Invite Link Handle ~~ //
  const handleShareInvite = (platform) => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          inviteLink
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(
          inviteLink
        )}&text=${encodeURIComponent("Hey! Join my class now 👇")}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  // `` Handle Teacher Invite Function `` //
  let toastId;
  const handleTeacherInvite = async () => {
    if (
      emailinput &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailinput) &&
      !TeacherEmails.includes(emailinput)
    ) {
      const updatedEmails = [...TeacherEmails, emailinput];
      setTeacherEmails(updatedEmails); // update React state
      setemailinput(""); // clear input

      toastId = toast.loading("Sending invite...");
      try {
        const result = await dispatch(
          inviteTeacherAsyncThunk({ email: emailinput, classId: ClassData._id })
        ).unwrap();

        if (result.isUser) {
          toast.update(toastId, {
            render: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>{result.message}</div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "1px solid #ccc",
                      padding: "5px 15px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      flex: 1,
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      handleSentNotification(result.user.email);
                    }}
                  >
                    Send
                  </button>
                  <button
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      border: "1px solid #ccc",
                      padding: "5px 15px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      flex: 1,
                    }}
                    onClick={() => {
                      toast.dismiss(toastId);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ),
            type: "success",
            isLoading: false,
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            icon: false,
          });
        } else {
          closeInviteTeacherModalRef.current.click();
          toast.update(toastId, {
            render: "Invite sent successfully.",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          localStorage.setItem("Teacher_emails", JSON.stringify(updatedEmails)); // use updated value
        }
      } catch (error) {
        console.log("Teacher inviting errors", error);
        toast.update(toastId, {
          render: `Error: ${error?.message || "Failed to send invite."}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      return; // early return so rest doesn't run
    }

    toast.error("Please enter a valid, non-duplicate email.");
  };

  // `` Function To Handle Sent Notification To Sub Teacher `` //
  const handleSentNotification = async (userEmail) => {
    const result = await dispatch(
      sentNotificationAsyncThunk({ email: userEmail, userid: user._id })
    );
    if (sentNotificationAsyncThunk.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      toast.dismiss(toastId);
      closeInviteTeacherModalRef.current.click();
    } else {
      const errorMessage =
        result.payload?.message || "Somenthing Went Wrong in sent notification";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div style={styles.container}>
        {/* Teachers Section */}
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Teachers</div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#addTeacherModal"
            style={styles.addButton}
          >
            <i className="fas fa-user-plus"></i> Add Teacher
          </button>
        </div>
        <div style={styles.member}>
          <img
            src={ClassData.teacher?.profile?.url}
            alt="Teacher Profile"
            style={styles.memberImage}
          />
          <span style={styles.memberName}>{ClassData.teacher?.fullname}</span>
        </div>
        {TeacherEmails &&
          TeacherEmails.map((email, idx) => (
            <div key={idx} style={styles.member}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9X66HK1AiE_zfvcSrNjVgpSq9zkiD5tNzqQ&s"
                    alt="Teacher Profile"
                    style={styles.memberImage}
                  />
                  <span style={{ color: "#adabab" }}>{email} (Invited)</span>
                  <button
                    onClick={() => {
                      const updatedEmails = TeacherEmails.filter(
                        (e) => e !== email
                      );
                      setTeacherEmails(updatedEmails);
                      localStorage.setItem(
                        "Teacher_emails",
                        JSON.stringify(updatedEmails)
                      );
                    }}
                    style={{
                      background: "none",
                      color: "red",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* Students Section */}
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Studnets</div>
          <button onClick={handleShareBoxOpen} style={styles.addButton}>
            <i className="fas fa-user-plus"></i> Add Student
          </button>
        </div>
        {ClassData.students && ClassData.students.length > 0 ? (
          ClassData.students.map((student, index) => (
            <div key={index} style={styles.member}>
              <img
                src={
                  student.profile?.url ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteItzPyeDKBxyWiOA8xrPZXIlxOYv1b1VVg&s"
                }
                alt="Student Profile"
                style={styles.memberImage}
              />
              <span style={styles.memberName}>{student.fullname}</span>
            </div>
          ))
        ) : (
          <p style={styles.noStudentsText}>No students</p>
        )}
        {ClassData.students?.length == 0 && (
          <>
            {/* Add Students Section */}
            <div style={styles.addStudentsSection}>
              <img
                src="https://img.freepik.com/premium-vector/diverse-team-brainstorming-with-computer-flat-vector-illustration-collab-concept-illustration_831490-5630.jpg?w=740"
                alt="Add Students Illustration"
                height="200"
                width="200"
                style={styles.addStudentsImage}
              />
              <p style={styles.addStudentsText}>Add students to this class</p>
              <button onClick={handleShareBoxOpen} style={styles.inviteButton}>
                <i className="fas fa-user-plus"></i> Invite Students
              </button>
            </div>
          </>
        )}
      </div>
      {/* Add Teacher Modal */}
      <div>
        <div
          className="modal fade"
          id="addTeacherModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Invite Teacher
                </h5>
                <button
                  type="button"
                  ref={closeInviteTeacherModalRef}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={emailinput}
                      onChange={(event) => setemailinput(event.target.value)}
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleTeacherInvite}
                  type="submit"
                  className="btn btn-primary"
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {shareBoxOpen && (
        <div style={styles.modalContainer}>
          {/* Header */}
          <div style={styles.modalHeader}>
            <h5 style={{ margin: 0 }}>🔗 Share Class Link</h5>
            <button onClick={handleShareBoxOpen} style={styles.closeButton}>
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>

          {/* Link & Copy */}
          <div style={styles.linkInputContainer}>
            <input
              type="text"
              readOnly
              value={inviteLink}
              style={styles.input}
            />
            <button onClick={handleCopy} style={styles.copyButton}>
              <i style={{ color: "black" }} className="ri-file-copy-line"></i>
            </button>
          </div>

          {/* Social Share Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => handleShareInvite("facebook")}
              className="btn btn-primary"
            >
              <i className="ri-facebook-fill me-1"></i> Facebook
            </button>
            <button
              onClick={() => handleShareInvite("twiter")}
              className="btn btn-info text-white"
            >
              <i className="ri-twitter-x-line me-1"></i> Twitter
            </button>
            <button
              onClick={() => handleShareInvite("whatsapp")}
              className="btn btn-success"
            >
              <i className="ri-whatsapp-line me-1"></i> WhatsApp
            </button>
            <button
              onClick={() => handleShareInvite("telegram")}
              className="btn btn-secondary"
            >
              <i className="ri-linkedin-box-line me-1"></i> Telegram
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default People;
