//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class JobRequirement
    {
        public int Id { get; set; }
        public string Details { get; set; }
        public string ArabicDetails { get; set; }
        public int VacancyId { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> LastUpdateDate { get; set; }
    
        public virtual Vacancy Vacancy { get; set; }
    }
}